export function genMatAddBody(rows, cols) {
	let funcBody = "\nreturn [\n";

	for (let r = 0; r < rows; r++) {
		funcBody += "\t\t["
		for (let c = 0; c < cols; c++) {
			funcBody += `a[${r}][${c}] + b[${r}][${c}]${c < cols - 1 ? ", " : ""}`
		}
		funcBody += `]${r < rows - 1 ? ", " : ""}\n`
	}

	funcBody += `\t];\n`
	return funcBody;
}
export function genMatAddFlatBody(rows, cols){
	let funcBody = `return {\n\t\tshape: [${rows},${cols}],\n\t\tdata: [\n\t\t\t`;

	for (let i = 0; i < rows * cols; i++) {
		funcBody += `a.data[${i}] + b.data[${i}]${i < (rows * cols) - 1 ? ", " : ""}`
	}

	funcBody += `\n\t\t]\n\t};\n`
	return funcBody;
}

export function genMatAddFunc(rows, cols) {
	rows = Number(rows);
	cols = Number(cols);
	const body = genMatAddBody(rows, cols);
	return new Function("a", "b", body);
}

export function genMatAddFlatFunc(rows, cols) {
	rows = Number(rows);
	cols = Number(cols);
	const body = genMatAddFlatBody(rows, cols);
	return new Function("a", "b", body);
}