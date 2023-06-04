import { addMatrixWebGl } from "../mat-webgl.js";
import { mat128AF32, mat128BF32, mat128ResultF32, mat1AF32, mat1BF32, mat1ResultF32, mat2AF32, mat2BF32, mat2ResultF32, mat4AF32, mat4BF32, mat4ResultF32, mat256AF32, mat256BF32 } from "../temp/data/mat-data-f32.js";

function assertMat(a, b) {
	for (const i in a) {
		if (a[i] !== b[i]) throw new Error("assertion failed. Arrays not equal");
	}
	console.log(`Passed!`, a, b)
}


{
	const result = await addMatrixWebGl({ shape: [2, 2], data: mat2AF32 }, { shape: [2, 2], data: mat2BF32 });
	assertMat(result.data, mat2ResultF32);
}
{
	const result = await addMatrixWebGl({ shape: [2, 2], data: mat2AF32 }, { shape: [2, 2], data: mat2BF32 });
	assertMat(result.data, mat2ResultF32);
}
{
	const result = await addMatrixWebGl({ shape: [4, 4], data: mat4AF32 }, { shape: [4, 4], data: mat4BF32 });
	assertMat(result.data, mat4ResultF32);
}
{
	const result = await addMatrixWebGl({ shape: [128, 128], data: mat128AF32 }, { shape: [128, 128], data: mat128BF32 });
	assertMat(result.data, mat128ResultF32);
}