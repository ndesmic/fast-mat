import { addMatrixFunc, addMatrixFlat } from "../mat.js";

export function getNormal(mean = 0, standardDeviation = 1) {
	const u1 = Math.random();
	const u2 = Math.random();
	return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * standardDeviation + mean;
}

function normalSampler(mean, standardDeviation){
	return () => getNormal(mean, standardDeviation);
}
function normalIntSampler(mean, standardDeviation){
	return () => Math.floor(getNormal(mean, standardDeviation));
}
function uniformSampler(start = 0, end = 1){
	return () => start + Math.random() * (end - start);
}

function getMat(rMax, cMax, sampler){
	const mat = [];
	for (let row = 0; row < rMax; row++) {
		const r = [];
		for (let col = 0; col < cMax; col++) {
			r.push(sampler());
		}
		mat.push(r);
	}
	return mat;
}

function getMatFlat(rMax, cMax, sampler) {
	const mat = [];
	for (let row = 0; row < rMax; row++) {
		for (let col = 0; col < cMax; col++) {
			mat.push(sampler());
		}
	}
	return mat;
}

export function addMatrixFlatSimple(a, b, constructor) {
	const out = new constructor(a.length);
	for(let i = 0; i < a.length; i++){
		out[i] = a[i] + b[i];
	}
	return out;
}

function toTitleCase(str){
	const [first, ...rest] = str;
	return first.toUpperCase() + rest.join("");
}

function serializeArray(array, constructor){
	if(constructor.name === "Array"){
		return `[${array.map(x => Array.isArray(x) ? serializeArray(x, constructor) : x).join(", ")}]`;
	}
	return `new ${constructor.name}([${array.map(x => x).join(", ")}])`
}

function writeTestFile(type, sampler, constructor, isFlat = false){
	let out = ""; //lol string buffer
	const sizes = [1, 2, 4, 8, 16, 32, 64, 100];

	for (const size of sizes) {
		const a = isFlat ? getMatFlat(size, size, sampler) : getMat(size, size, sampler);
		const b = isFlat ? getMatFlat(size, size, sampler) : getMat(size, size, sampler);
		const r = isFlat ? addMatrixFlatSimple(a, b, constructor) : addMatrixFunc(a, b);

		out += `export const mat${size}A${toTitleCase(type)} = ${serializeArray(a, constructor)};\n`;
		out += `export const mat${size}B${toTitleCase(type)} = ${serializeArray(b, constructor)};\n`;
		out += `export const mat${size}Result${toTitleCase(type)} = ${serializeArray(r, constructor)}\n\n`;
	}

	Deno.writeTextFileSync(`./data/mat-data-${type.toLowerCase()}.js`, out);
}

writeTestFile("num", normalSampler(0, 1e9), Array, false);
writeTestFile("i32", normalIntSampler(0, Number.MIN_SAFE_INTEGER / 6), Int32Array, true);
writeTestFile("f64", normalSampler(0, 1e9), Float64Array, true);
writeTestFile("f32", normalSampler(0, 1e9), Float32Array, true);
