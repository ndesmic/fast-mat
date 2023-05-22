import { genMatAddBody, genMatAddFlatBody } from "../mat-dynamic.js";

export function genMatAddFunctionString(rows, cols) {
	return `export function addMatrix${rows}x${cols}Nested(a,b){\n${genMatAddBody(rows, cols)}\n}`;
}
export function genMatAddFlatFunctionString(rows, cols) {
	return `export function addMatrix${rows}x${cols}Flat(a,b){\n\t${genMatAddFlatBody(rows, cols)}\n}`;
}


function writeFile(type, functionGenerator){
	const sizes = [1, 2, 4, 8, 16, 32, 64, 128, 256];
	let out = ""; //lol string buffer

	for (const size of sizes) {
		out += functionGenerator(size, size) + "\n\n";
	}

	Deno.writeTextFileSync(`./presized/mat-presized-${type.toLowerCase()}.js`, out);
}

writeFile("nested", genMatAddFunctionString);
writeFile("flat", genMatAddFlatFunctionString);

