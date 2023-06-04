import strategyInfo from "../strategies.js";

const sizes = [32, 64, 128, 256, 512, 1024];
const strategies = Object.entries(strategyInfo)
	.filter(([k,v]) => !/unrolled/.test(k))
	.map(([k, v]) => v);

function getExport(i) {
	if (typeof (i.export) === "function") {
		return sizes.map(s => i.export(s)).join(", ");
	}

	return i.export;
}
function getImportFuncs() {
	let importList = "";
	const modules = {};

	for (const strat of strategies) {
		if (modules[strat.module]) {
			modules[strat.module].push(strat);
		} else {
			modules[strat.module] = [strat];
		}
	}

	for (const [key, imports] of Object.entries(modules)) {
		importList += `import {\n${imports.map(i => getExport(i)).join(", ")}\n} from "${key}";\n`;
	}

	return importList + "\n";
}

function getArgument(name, size, typeSuffix) {
	const arg = `mat${size}${name}${typeSuffix}`;
	if (["F64", "F32", "I32"].includes(typeSuffix)) {
		return `{ shape: [${size}, ${size}], data: ${arg} }`;
	}
	return arg;
}

function callFunction(strat, size) {
	let typeSuffix
	switch (strat.inputType) {
		case "flatNum": {
			typeSuffix = "Flat";
			break;
		}
		case "f64": {
			typeSuffix = "F64";
			break;
		}
		case "f32": {
			typeSuffix = "F32";
			break;
		}
		case "i32": {
			typeSuffix = "I32";
			break;
		}
		case "nestedNum":
		default: {
			typeSuffix = "Num";
		}
	}

	if (typeof (strat.export) === "function") {
		return `await ${strat.export(size)}(${getArgument("A", size, typeSuffix)}, ${getArgument("B", size, typeSuffix)})`;
	}
	return `await ${strat.export}(${getArgument("A", size, typeSuffix)}, ${getArgument("B", size, typeSuffix)})`;
}

//Constuct Test File
let testFile = "";

testFile += `import { getMat, getMatFlat, normalSampler, normalIntSampler } from "../../utils/random-util.js";\n`;

for(const size of sizes){
	testFile += `const mat${size}ANum = getMat(${size}, ${size}, normalSampler(0, 1e9));\n`;
	testFile += `const mat${size}BNum = getMat(${size}, ${size}, normalSampler(0, 1e9));\n`;
	testFile += `const mat${size}AFlat = { shape: [${size},${size}], data: getMatFlat(${size}, ${size}, normalSampler(0, 1e9)) };\n`;
	testFile += `const mat${size}BFlat = { shape: [${size},${size}], data: getMatFlat(${size}, ${size}, normalSampler(0, 1e9)) };\n`;
	testFile += `const mat${size}AI32 = new Int32Array(getMatFlat(${size}, ${size},  normalIntSampler(0, Number.MIN_SAFE_INTEGER / 6)));\n`;
	testFile += `const mat${size}BI32 = new Int32Array(getMatFlat(${size}, ${size},  normalIntSampler(0, Number.MIN_SAFE_INTEGER / 6)));\n`;
	testFile += `const mat${size}AF32 = new Float32Array(getMatFlat(${size}, ${size},  normalSampler(0, 1e4)));\n`;
	testFile += `const mat${size}BF32 = new Float32Array(getMatFlat(${size}, ${size}, normalSampler(0, 1e4)));\n`;
	testFile += `const mat${size}AF64 = new Float64Array(getMatFlat(${size}, ${size}, normalSampler(0, 1e9)));\n`;
	testFile += `const mat${size}BF64 = new Float64Array(getMatFlat(${size}, ${size}, normalSampler(0, 1e9)));\n`;
}

//strats

testFile += getImportFuncs(strategies);

//libs

testFile += `import { bench } from "../../web/bench.js"\n\n`;
testFile += `const tick = () => new Promise((res) => setTimeout(res, 0));\n` //make sure we have a bit of render time between tests to update user
testFile += `const runs = [];\n\n`;

testFile += `document.body.innerHTML = "Running...";\n\n`;

//tests

for (const strat of strategies) {
	testFile += `await tick();\n`;
	for (const size of sizes) {
		testFile += `runs.push(await bench("Add ${size}x${size} (${strat.name})", { group: "${size}x${size}" }, async () => {`
		testFile += callFunction(strat, size);
		testFile += `}));\n\n`;
	}
}

testFile += `await fetch(".", {
	method: "POST",
	body: JSON.stringify({
		benches: runs
	})
});`;

testFile += `console.log("Complete!");\n`;
testFile += `document.body.innerHTML = "Complete!";\n`;

Deno.mkdirSync("./temp/web", { recursive: true });
Deno.writeTextFileSync("./temp/web/web-bench-xl.js", testFile);