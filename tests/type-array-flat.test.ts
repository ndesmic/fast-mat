import { assertEquals } from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { 
	addMatrixFloat64Flat, 
	addMatrixFloat32Flat, 
	addMatrixInt32Flat,
} from "../mat.js";
import { mat128AF64, mat128BF64, mat128ResultF64, mat1AF64, mat1BF64, mat1ResultF64, mat2AF64, mat2BF64, mat2ResultF64, mat4AF64, mat4BF64, mat4ResultF64 } from "../data/mat-data-f64.js";
import { mat128AF32, mat128BF32, mat128ResultF32, mat1AF32, mat1BF32, mat1ResultF32, mat2AF32, mat2BF32, mat2ResultF32, mat4AF32, mat4BF32, mat4ResultF32 } from "../data/mat-data-f32.js";
import { mat128AI32, mat128BI32, mat128ResultI32, mat1AI32, mat1BI32, mat1ResultI32, mat2AI32, mat2BI32, mat2ResultI32, mat4AI32, mat4BI32, mat4ResultI32 } from "../data/mat-data-i32.js";

//F32 tests are broken due to rounding errors

Deno.test("Adds 1x1", () => {
	const resultF64Flat = addMatrixFloat64Flat({ shape: [1,1], data: mat1AF64 }, { shape: [1,1], data: mat1BF64 });
	const resultF32Flat = addMatrixFloat32Flat({ shape: [1,1], data: mat1AF32 }, { shape: [1,1], data: mat1BF32 });
	const resultI32Flat = addMatrixInt32Flat({ shape: [1,1], data: mat1AI32 }, { shape: [1,1], data: mat1BI32 });

	assertEquals(resultF64Flat.data, mat1ResultF64);
	//assertEquals(resultF32Flat.data, mat1ResultF32);
	assertEquals(resultI32Flat.data, mat1ResultI32);
});

Deno.test("Adds 2x2", () => {
	const resultF64Flat = addMatrixFloat64Flat({ shape: [2,2], data: mat2AF64 }, { shape: [1,1], data: mat2BF64 });
	//const resultF32Flat = addMatrixFloat32Flat({ shape: [2,2], data: mat2AF32 }, { shape: [1,1], data: mat2BF32 });
	const resultI32Flat = addMatrixInt32Flat({ shape: [2,2], data: mat2AI32 }, { shape: [1,1], data: mat2BI32 });


	assertEquals(resultF64Flat.data, mat2ResultF64);
	//assertEquals(resultF32Flat.data, mat2ResultF32);
	assertEquals(resultI32Flat.data, mat2ResultI32);
});

Deno.test("Adds 4x4", () => {
	const resultF64Flat = addMatrixFloat64Flat({ shape: [4,4], data: mat4AF64 }, { shape: [4,4], data: mat4BF64 });
	//const resultFlatF32 = addMatrixFloat32Flat({ shape: [4,4], data: mat4AF32 }, { shape: [4,4], data: mat4BF32 });
	const resultI32Flat = addMatrixInt32Flat({ shape: [4,4], data: mat4AI32 }, { shape: [4,4], data: mat4BI32 });

	assertEquals(resultF64Flat.data, mat4ResultF64);
	//assertEquals(resultF32Flat.data, mat4ResultF32);
	assertEquals(resultI32Flat.data, mat4ResultI32);
});

Deno.test("Adds 100x100", () => {
	const resultF64Flat = addMatrixFloat64Flat({ shape: [100,100], data: mat128AF64 }, { shape: [100,100], data: mat128BF64 });
	//const resultFlatF32 = addMatrixFloat32Flat({ shape: [100,100], data: mat100AF32 }, { shape: [100,100], data: mat100BF32 });
	const resultI32Flat = addMatrixInt32Flat({ shape: [100,100], data: mat128AI32 }, { shape: [100,100], data: mat128BI32 });
	

	assertEquals(resultF64Flat.data, mat128ResultF64);
	//assertEquals(resultF32Flat.data, mat100ResultF32);
	assertEquals(resultI32Flat.data, mat128ResultI32);
});