import { addMatrixWebGpu } from "../mat-webgpu.js";
import { mat128AF32, mat128BF32, mat128ResultF32, mat1AF32, mat1BF32, mat1ResultF32, mat2AF32, mat2BF32, mat2ResultF32, mat4AF32, mat4BF32, mat4ResultF32, mat8AF32, mat8BF32, mat8ResultF32, mat16AF32, mat16BF32, mat16ResultF32, mat256AF32, mat256BF32, mat256ResultF32 } from "../temp/data/mat-data-f32.js";
import { getMatFlat, normalSampler } from "../utils/random-util.js";

function assertMat(a, b, label = ""){
	// for(const dim in a.shape){
	// 	if(a.shape[dim] !== b.shape[dim]) throw new Error("assertion failed. Shapes not equal");
	// }
	// if(a.data.length !== b.data.length) throw new Error("asserion failed. Arrays not same size");
	for(const i in a){
		if(a[i] !== b[i]) {
			throw new Error(`[${label}] Assertion failed. Arrays not equal. First divergence at index ${i}, expected: ${b[i]} , got: ${a[i]}`);
		}
	}
	console.log(`Passed!`, label)
}

{
	const result = await addMatrixWebGpu({ shape: [1,1], data: mat1AF32 }, { shape: [1,1], data:  mat1BF32 });
	assertMat(result.data, mat1ResultF32, "1");
}
{
	const result = await addMatrixWebGpu({ shape: [2,2], data: mat2AF32 }, { shape: [2, 2], data: mat2BF32 });
	assertMat(result.data, mat2ResultF32, "2");
}
{
	const result = await addMatrixWebGpu({ shape: [4, 4], data: mat4AF32 }, { shape: [4, 4], data: mat4BF32 });
	assertMat(result.data, mat4ResultF32, "4");
}
{
	const result = await addMatrixWebGpu({ shape: [8, 8], data: mat8AF32 }, { shape: [8, 8], data: mat8BF32 });
	assertMat(result.data, mat8ResultF32, "8");
}
{
	const result = await addMatrixWebGpu({ shape: [16, 16], data: mat16AF32 }, { shape: [16, 16], data: mat16BF32 });
	assertMat(result.data, mat16ResultF32, "16");
}
{
	const result = await addMatrixWebGpu({ shape: [128, 128], data: mat128AF32 }, { shape: [128, 128], data: mat128BF32 });
	assertMat(result.data, mat128ResultF32, "128");
}
{
	const result = await addMatrixWebGpu({ shape: [256, 256], data: mat256AF32 }, { shape: [128, 128], data: mat256BF32 });
	assertMat(result.data, mat256ResultF32, "256");
}
{
	const result = await addMatrixWebGpu(
		{ shape: [1024, 1024], data: new Float32Array(getMatFlat(1024, 1024, normalSampler(1e9) )) }, 
		{ shape: [1024, 1024], data: new Float32Array(getMatFlat(1024, 1024, normalSampler(1e9) )) }
	);
	console.log(result)
}