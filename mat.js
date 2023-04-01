export function addMatrixFunc(a, b) {
	return a.map((row, ri) => row.map((val, ci) => b[ri][ci] + val));
}

export function addMatrixLoop(a, b) {
	const out = [];
	for (let row = 0; row < a.length; row++) {
		const arrayRow = [];
		for (let col = 0; col < a[0].length; col++) {
			arrayRow.push(a[row][col] + b[row][col])
		}
		out.push(arrayRow);
	}
	return out;
}

export function addMatrixLoopPreAlloc(a, b) {
	const out = new Array(a.length);
	for (let row = 0; row < a.length; row++) {
		const arrayRow = new Array(a[0].length);
		for (let col = 0; col < a[0].length; col++) {
			arrayRow[col] = a[row][col] + b[row][col];
		}
		out[row] = arrayRow;
	}
	return out;
}

export function nestedArrayToFlat(nested){
	return {
		shape: [nested.length, nested[0].length],
		data: nested.flat(Infinity)
	}
}

export function flatToNestedArray(flat){
	const data = new Array(flat.shape[0]);
	for(let row = 0; row < flat.shape[0]; row++){
		const rowArray = new Array(flat.shape[1]);
		for(let col = 0; col < flat.shape[1]; col++){
			rowArray[col] = flat.data[row * flat.shape[1] + col]; 
		}
		data[row] = rowArray;
	}
	return data;
}

export function addMatrixFlat(a, b) {
	const out = {
		shape: a.shape,
		data: new Array(a.data.length)
	};
	for (let row = 0; row < a.shape[0]; row++) {
		for (let col = 0; col < a.shape[1]; col++) {
			const index = (row * a.shape[1]) + col;
			out.data[index] = a.data[index] + b.data[index];
		}
	}
	return out;
}

export function addMatrixFlatColMajor(a, b) {
	const out = {
		shape: a.shape,
		data: new Array(a.data.length)
	};
	for (let col = 0; col < a.shape[1]; col++) {
		for (let row = 0; row < a.shape[0]; row++) {
			const index = (row * a.shape[1]) + col;
			out.data[index] = a.data[index] + b.data[index];
		}
	}
	return out;
}

export function addMatrixFlatSimple(a, b) {
	const out = {
		shape: a.shape,
		data: new Array(a.data.length)
	};
	for(let i = 0; i < a.data.length; i++){
		out.data[i] = a.data[i] + b.data[i];
	}
	return out;
}

export function addMatrixFlatSimpleFunc(a, b) {
	return {
		shape: a.shape,
		data: a.data.map((d,i) => d + b.data[i])
	}
}


export function addMatrixFloat64(a, b) {
	const out = {
		shape: a.shape,
		data: new Float64Array(a.data.length)
	};
	for (let row = 0; row < a.shape[0]; row++) {
		for (let col = 0; col < a.shape[1]; col++) {
			const index = (row * a.shape[1]) + col;
			out.data[index] = a.data[index] + b.data[index];
		}
	}
	return out;
}

export function addMatrixFloat32(a, b) {
	const out = {
		shape: a.shape,
		data: new Float32Array(a.data.length)
	};
	for (let row = 0; row < a.shape[0]; row++) {
		for (let col = 0; col < a.shape[1]; col++) {
			const index = (row * a.shape[1]) + col;
			out.data[index] = a.data[index] + b.data[index];
		}
	}
	return out;
}

export function addMatrixInt32(a, b) {
	const out = {
		shape: a.shape,
		data: new Int32Array(a.data.length)
	};
	for (let row = 0; row < a.shape[0]; row++) {
		for (let col = 0; col < a.shape[1]; col++) {
			const index = (row * a.shape[1]) + col;
			out.data[index] = a.data[index] + b.data[index];
		}
	}
	return out;
}