import { addMatrixFunc, addMatrixFlatSimple } from "../mat.js";
import { getMat, getMatFlat, normalIntSampler, normalSampler } from "../utils/random-util.js";

function toTitleCase(str){
	const [first, ...rest] = str;
	return first.toUpperCase() + rest.join("");
}

function serializeArray(array, constructor){
	if(constructor.name === "Array"){
		return `[${array.map(x => Array.isArray(x) ? serializeArray(x, constructor) : x).join(", ")}]`;
	}
	return `new ${constructor.name}([${array.join(", ")}])`
}

function writeTestFile(type, sampler, constructor, isFlat = false){
	let out = ""; //lol string buffer
	const sizes = [1, 2, 4, 8, 16, 32, 64, 128, 256];

	for (const size of sizes) {
		const a = isFlat ? getMatFlat(size, size, sampler) : getMat(size, size, sampler);
		const b = isFlat ? getMatFlat(size, size, sampler) : getMat(size, size, sampler);
		const r = isFlat ? addMatrixFlatSimple(a, b, constructor) : addMatrixFunc(a, b);

		

		out += `export const mat${size}A${toTitleCase(type)} = ${serializeArray(a, constructor)};\n`;
		out += `export const mat${size}B${toTitleCase(type)} = ${serializeArray(b, constructor)};\n`;
		out += `export const mat${size}Result${toTitleCase(type)} = ${serializeArray(r, constructor)}\n\n`;
	}

	Deno.writeTextFileSync(`./temp/data/mat-data-${type.toLowerCase()}.js`, out);
}

Deno.mkdirSync("./temp/data", { recursive: true });
writeTestFile("num", normalSampler(0, 1e9), Array, false);
writeTestFile("i32", normalIntSampler(0, Number.MIN_SAFE_INTEGER / 6), Int32Array, true);
writeTestFile("f64", normalSampler(0, 1e9), Float64Array, true);
writeTestFile("f32", normalSampler(0, 1e4, x => Math.fround(x)), Float32Array, true);
