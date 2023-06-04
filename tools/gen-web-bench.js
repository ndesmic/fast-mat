import strategyInfo from "../strategies.js";

const sizes = [1, 2, 4, 8, 16, 32, 64, 128, 256];
const strategies = Object.entries(strategyInfo).map(([k,v]) => v);

function getExport(i){
	if(typeof (i.export) === "function"){
		return sizes.map(s => i.export(s)).join(", ");
	}

	return i.export;
}
function getImportFuncs(){
	let importList = "";
	const modules = {};

	for(const strat of strategies){
		if(modules[strat.module]){
			modules[strat.module].push(strat);
		} else {
			modules[strat.module] = [strat];
		}
	}

	for(const [key, imports] of Object.entries(modules)){
		importList += `import {\n${imports.map(i => getExport(i)).join(", ")}\n} from "${key}";\n`;
	}

	return importList + "\n";
}

function getArgument(name, size, typeSuffix){
	const arg = `mat${size}${name}${typeSuffix}`;
	if (["F64", "F32", "I32"].includes(typeSuffix)) {
		return `{ shape: [${size}, ${size}], data: ${arg} }`;
	}
	return arg;
}

function callFunction(strat, size){
	let typeSuffix 
	switch(strat.inputType){
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

	if (typeof (strat.export) === "function"){
		return `await ${strat.export(size)}(${getArgument("A", size, typeSuffix)}, ${getArgument("B", size, typeSuffix)})`;
	}
	return `await ${strat.export}(${getArgument("A", size, typeSuffix)}, ${getArgument("B", size, typeSuffix)})`;
}

//Constuct Test File
let testFile = "";

//test data (nums)
testFile += "import {\n";

for(const size of sizes){
	testFile += `\tmat${size}ANum,\n\tmat${size}BNum,\n`;
}

testFile += `} from "../data/mat-data-num.js"\n\n`

//test data (flat nums)

testFile += `import { nestedArrayToFlat } from "../../mat.js";\n`

for(const size of sizes){
	testFile += `const mat${size}AFlat = nestedArrayToFlat(mat${size}ANum);\n`
	testFile += `const mat${size}BFlat = nestedArrayToFlat(mat${size}BNum);\n`
}
testFile += "\n\n";

//test data (f64)

testFile += "import {\n";

for (const size of sizes) {
	testFile += `\tmat${size}AF64,\n\tmat${size}BF64,\n`;
}

testFile += `} from "../data/mat-data-f64.js"\n\n`

//test data (f32)

testFile += "import {\n";

for (const size of sizes) {
	testFile += `\tmat${size}AF32,\n\tmat${size}BF32,\n`;
}

testFile += `} from "../data/mat-data-f32.js"\n\n`

//test data (i32)

testFile += "import {\n";

for (const size of sizes) {
	testFile += `\tmat${size}AI32,\n\tmat${size}BI32,\n`;
}

testFile += `} from "../data/mat-data-i32.js"\n\n`

//strats

testFile += getImportFuncs(strategies);

//libs

testFile += `import { bench } from "../../web/bench.js"\n\n`;
testFile += `const tick = () => new Promise((res) => setTimeout(res, 0));\n` //make sure we have a bit of render time between tests to update user
testFile += `const runs = [];\n\n`;

testFile += `document.body.innerHTML = "Running...";\n\n`;

//tests

for(const strat of strategies){
	testFile += `await tick();\n`;
	for(const size of sizes){
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
Deno.writeTextFileSync("./temp/web/web-bench.js", testFile);