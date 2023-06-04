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

export function addMatrixLoopPrealloc(a, b) {
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
	for (let i = 0; i < a.data.length; i++) {
		out.data[i] = a.data[i] + b.data[i];
	}
	return out;
}

//flat Typed arrays

export function addMatrixFloat64Flat(a, b) {
	const out = {
		shape: a.shape,
		data: new Float64Array(a.data.length)
	};
	for (let i = 0; i < a.data.length; i++) {
		out.data[i] = a.data[i] + b.data[i];
	}
	return out;
}

export function addMatrixFloat32Flat(a, b) {
	const out = {
		shape: a.shape,
		data: new Float32Array(a.data.length)
	};
	for (let i = 0; i < a.data.length; i++) {
		out.data[i] = a.data[i] + b.data[i];
	}
	return out;
}

export function addMatrixInt32Flat(a, b) {
	const out = {
		shape: a.shape,
		data: new Int32Array(a.data.length)
	};
	for (let i = 0; i < a.data.length; i++) {
		out.data[i] = a.data[i] + b.data[i];
	}
	return out;
}

let wasm;
if(globalThis.Deno){
	wasm = await Deno.readFile("./temp/wasm/mat.wasm");
} else {
	wasm = await fetch("../temp/wasm/mat.wasm").then(r => r.arrayBuffer());
}
const { instance: matInstance } = await WebAssembly.instantiate(wasm, {
	// lib: {
	// 	print_int: function(num){
	// 		console.log(num);
	// 	},
	// 	print_float: function(num){
	// 		console.log(num);
	// 	},
	// 	print_brk: function(){
	// 		console.log("---")
	// 	}
	// }
});

export function addMatrixWasmF64(a,b){
	const lhsElementOffset = 0;
	const rhsElementOffset = lhsElementOffset + a.data.length;
	const rhsByteOffset = rhsElementOffset * 8;
	const resultElementOffset = lhsElementOffset + a.data.length + b.data.length;
	const resultByteOffset = resultElementOffset * 8;
	const elementLength = a.data.length;

	// //grow memory if needed
	// const spaceLeftover = matInstance.exports.memory.buffer.byteLength - (a.data.length * 3 * 8)
	// if (spaceLeftover < 0){
	// 	const pagesNeeded = Math.ceil((a.data.length * 3 * 8) / (64 * 1024));
	// 	const pagesHave = matInstance.exports.memory.buffer.byteLength / (64 * 1024);
	// 	matInstance.exports.memory.grow(pagesNeeded - pagesHave);
	// }

	const f64View = new Float64Array(matInstance.exports.memory.buffer);
	f64View.set(a.data, lhsElementOffset);
	f64View.set(b.data, rhsElementOffset);

	matInstance.exports.addMatrixF64(0, rhsByteOffset, elementLength, resultByteOffset);

	return {
		shape: a.shape,
		data: f64View.slice(resultElementOffset, resultElementOffset + elementLength)
	};
}

export function addMatrixWasmSimdF64(a,b){
	const lhsElementOffset = 0;
	const rhsElementOffset = lhsElementOffset + a.data.length;
	const rhsByteOffset = rhsElementOffset * 8;
	const resultElementOffset = lhsElementOffset + a.data.length + b.data.length;
	const resultByteOffset = resultElementOffset * 8;
	const elementLength = a.data.length;

	//grow memory if needed
	// const spaceLeftover = matInstance.exports.memory.buffer.byteLength - (a.data.length * 3 * 8)
	// if (spaceLeftover < 0){
	// 	const pagesNeeded = Math.ceil((a.data.length * 3 * 8) / (64 * 1024));
	// 	const pagesHave = matInstance.exports.memory.buffer.byteLength / (64 * 1024);
	// 	matInstance.exports.memory.grow(pagesNeeded - pagesHave);
	// }

	const f64View = new Float64Array(matInstance.exports.memory.buffer);
	f64View.set(a.data, lhsElementOffset);
	f64View.set(b.data, rhsElementOffset);

	matInstance.exports.addMatrixSimdF64(0, rhsByteOffset, elementLength, resultByteOffset);

	return {
		shape: a.shape,
		data: f64View.slice(resultElementOffset, resultElementOffset + elementLength)
	};
}

export function addMatrixWasmSimdF32(a, b) {
	const lhsElementOffset = 0;
	const rhsElementOffset = lhsElementOffset + a.data.length;
	const rhsByteOffset = rhsElementOffset * 4;
	const resultElementOffset = lhsElementOffset + a.data.length + b.data.length;
	const resultByteOffset = resultElementOffset * 4;
	const elementLength = a.data.length;

	//grow memory if needed
	// const spaceLeftover = matInstance.exports.memory.buffer.byteLength - (a.data.length * 3 * 8)
	// if (spaceLeftover < 0){
	// 	const pagesNeeded = Math.ceil((a.data.length * 3 * 8) / (64 * 1024));
	// 	const pagesHave = matInstance.exports.memory.buffer.byteLength / (64 * 1024);
	// 	matInstance.exports.memory.grow(pagesNeeded - pagesHave);
	// }

	const f32View = new Float32Array(matInstance.exports.memory.buffer);
	f32View.set(a.data, lhsElementOffset);
	f32View.set(b.data, rhsElementOffset);

	matInstance.exports.addMatrixSimdF32(0, rhsByteOffset, elementLength, resultByteOffset);

	return {
		shape: a.shape,
		data: f32View.slice(resultElementOffset, resultElementOffset + elementLength)
	};
}

export function addMatrixWasmSimdI32(a, b) {
	const lhsElementOffset = 0;
	const rhsElementOffset = lhsElementOffset + a.data.length;
	const rhsByteOffset = rhsElementOffset * 4;
	const resultElementOffset = lhsElementOffset + a.data.length + b.data.length;
	const resultByteOffset = resultElementOffset * 4;
	const elementLength = a.data.length;

	//grow memory if needed
	// const spaceLeftover = matInstance.exports.memory.buffer.byteLength - (a.data.length * 3 * 8)
	// if (spaceLeftover < 0){
	// 	const pagesNeeded = Math.ceil((a.data.length * 3 * 8) / (64 * 1024));
	// 	const pagesHave = matInstance.exports.memory.buffer.byteLength / (64 * 1024);
	// 	matInstance.exports.memory.grow(pagesNeeded - pagesHave);
	// }

	const i32View = new Int32Array(matInstance.exports.memory.buffer);
	i32View.set(a.data, lhsElementOffset);
	i32View.set(b.data, rhsElementOffset);

	matInstance.exports.addMatrixSimdI32(0, rhsByteOffset, elementLength, resultByteOffset);

	return {
		shape: a.shape,
		data: i32View.slice(resultElementOffset, resultElementOffset + elementLength)
	};
}