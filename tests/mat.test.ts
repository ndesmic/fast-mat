import { assertEquals } from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { 
	addMatrixFunc, 
	addMatrixLoop, 
	addMatrixLoopPrealloc, 
	addMatrixFlat, 
	nestedArrayToFlat, 
	flatToNestedArray, 
	addMatrixFloat64, 
	addMatrixFloat32, 
	addMatrixInt32,
} from "../mat.js";
import { addMatrix1x1Nested, addMatrix2x2Nested, addMatrix128x128Nested } from "../temp/presized/mat-presized-nested.js";
import { addMatrix1x1Flat, addMatrix2x2Flat, addMatrix128x128Flat } from "../temp/presized/mat-presized-flat.js";
import { mat128AF64, mat128BF64, mat128ResultF64, mat1AF64, mat1BF64, mat1ResultF64, mat2AF64, mat2BF64, mat2ResultF64, mat4AF64, mat4BF64, mat4ResultF64 } from "../temp/data/mat-data-f64.js";
import { mat128ANum, mat128BNum, mat128ResultNum, mat1ANum, mat1BNum, mat1ResultNum, mat2ANum, mat2BNum, mat2ResultNum, mat4ANum, mat4BNum, mat4ResultNum } from "../temp/data/mat-data-num.js";
import { mat128AF32, mat128BF32, mat128ResultF32, mat1AF32, mat1BF32, mat1ResultF32, mat2AF32, mat2BF32, mat2ResultF32, mat4AF32, mat4BF32, mat4ResultF32 } from "../temp/data/mat-data-f32.js";
import { mat128AI32, mat128BI32, mat128ResultI32, mat1AI32, mat1BI32, mat1ResultI32, mat2AI32, mat2BI32, mat2ResultI32, mat4AI32, mat4BI32, mat4ResultI32 } from "../temp/data/mat-data-i32.js";
import { genMatAddFunc, genMatAddFlatFunc } from "../mat-dynamic.js";

//F32 tests are broken due to rounding errors

Deno.test("Adds 1x1", () => {
	const resultFunc = addMatrixFunc(mat1ANum,mat1BNum);
	const resultLoop = addMatrixLoop(mat1ANum,mat1BNum);
	const resultLoopPreAlloc = addMatrixLoopPrealloc(mat1ANum,mat1BNum);
	const resultPresize = addMatrix1x1Nested(mat1ANum, mat1BNum);
	const resultDynamic = genMatAddFunc(1,1)(mat1ANum, mat1BNum);
	const resultFlat = addMatrixFlat(nestedArrayToFlat(mat1ANum), nestedArrayToFlat(mat1BNum));
	const resultFlatPresize = addMatrix1x1Flat(nestedArrayToFlat(mat1ANum), nestedArrayToFlat(mat1BNum));
	const resultFlatDynamic = genMatAddFlatFunc(1,1)(nestedArrayToFlat(mat1ANum), nestedArrayToFlat(mat1BNum));
	const resultF64 = addMatrixFloat64({ shape: [1,1], data: mat1AF64 }, { shape: [1,1], data: mat1BF64 });
	const resultF32 = addMatrixFloat32({ shape: [1,1], data: mat1AF32 }, { shape: [1,1], data: mat1BF32 });
	const resultI32 = addMatrixInt32({ shape: [1,1], data: mat1AI32 }, { shape: [1,1], data: mat1BI32 });

	assertEquals(resultFunc, mat1ResultNum);
	assertEquals(resultLoop, mat1ResultNum);
	assertEquals(resultLoopPreAlloc, mat1ResultNum);
	assertEquals(resultPresize, mat1ResultNum);
	assertEquals(resultDynamic, mat1ResultNum);
	assertEquals(flatToNestedArray(resultFlat), mat1ResultNum);
	assertEquals(flatToNestedArray(resultFlatPresize), mat1ResultNum);
	assertEquals(flatToNestedArray(resultFlatDynamic), mat1ResultNum);
	assertEquals(resultF64.data, mat1ResultF64);
	assertEquals(resultF32.data, mat1ResultF32);
	assertEquals(resultI32.data, mat1ResultI32);
});

Deno.test("Adds 2x2", () => {
	const resultFunc = addMatrixFunc(mat2ANum, mat2BNum);
	const resultLoop = addMatrixLoop(mat2ANum, mat2BNum);
	const resultLoopPreAlloc = addMatrixLoopPrealloc(mat2ANum, mat2BNum);
	const resultPresize = addMatrix2x2Nested(mat2ANum, mat2BNum);
	const resultDynamic = genMatAddFunc(2,2)(mat2ANum, mat2BNum);
	const resultFlat = addMatrixFlat(nestedArrayToFlat(mat2ANum), nestedArrayToFlat(mat2BNum));
	const resultFlatPresize = addMatrix2x2Flat(nestedArrayToFlat(mat2ANum), nestedArrayToFlat(mat2BNum));
	const resultFlatDynamic = genMatAddFlatFunc(2,2)(nestedArrayToFlat(mat2ANum), nestedArrayToFlat(mat2BNum));
	const resultFlatF64 = addMatrixFloat64({ shape: [2,2], data: mat2AF64 }, { shape: [2,2], data: mat2BF64 });
	const resultFlatF32 = addMatrixFloat32({ shape: [2,2], data: mat2AF32 }, { shape: [2,2], data: mat2BF32 });
	const resultFlatI32 = addMatrixInt32({ shape: [2,2], data: mat2AI32 }, { shape: [2,2], data: mat2BI32 })

	assertEquals(resultFunc, mat2ResultNum);
	assertEquals(resultLoop, mat2ResultNum);
	assertEquals(resultLoopPreAlloc, mat2ResultNum);
	assertEquals(resultPresize, mat2ResultNum);
	assertEquals(resultDynamic, mat2ResultNum);
	assertEquals(flatToNestedArray(resultFlat), mat2ResultNum);
	assertEquals(flatToNestedArray(resultFlatPresize), mat2ResultNum);
	assertEquals(flatToNestedArray(resultFlatDynamic), mat2ResultNum);
	assertEquals(resultFlatF64.data, mat2ResultF64);
	assertEquals(resultFlatI32.data, mat2ResultI32);
});

Deno.test("Adds 4x4", () => {
	const resultFunc = addMatrixFunc(mat4ANum, mat4BNum);
	const resultF64 = addMatrixFloat64({ shape: [4,4], data: mat4AF64 }, { shape: [4,4], data: mat4BF64 });
	const resultFlatF32 = addMatrixFloat32({ shape: [4,4], data: mat4AF32 }, { shape: [4,4], data: mat4BF32 });
	const resultI32 = addMatrixInt32({ shape: [4,4], data: mat4AI32 }, { shape: [4,4], data: mat4BI32 });

	assertEquals(resultFunc, mat4ResultNum);
	assertEquals(resultF64.data, mat4ResultF64);
	assertEquals(resultFlatF32.data, mat4ResultF32);
	assertEquals(resultI32.data, mat4ResultI32);
});

Deno.test("Adds 100x100", () => {
	const resultFunc = addMatrixFunc(mat128ANum, mat128BNum);
	const resultLoop = addMatrixLoop(mat128ANum, mat128BNum);
	const resultLoopPreAlloc = addMatrixLoopPrealloc(mat128ANum, mat128BNum);
	const resultPresize = addMatrix128x128Nested(mat128ANum, mat128BNum);
	const resultDynamic = genMatAddFunc(128, 128)(mat128ANum, mat128BNum);
	const resultFlat = addMatrixFlat(nestedArrayToFlat(mat128ANum), nestedArrayToFlat(mat128BNum));
	const resultFlatPresize = addMatrix128x128Flat(nestedArrayToFlat(mat128ANum), nestedArrayToFlat(mat128BNum));
	const resultFlatDynamic = genMatAddFlatFunc(128,128)(nestedArrayToFlat(mat128ANum), nestedArrayToFlat(mat128BNum));
	const resultF64 = addMatrixFloat64({ shape: [128,128], data: mat128AF64 }, { shape: [128,128], data: mat128BF64 });
	const resultF32 = addMatrixFloat32({ shape: [128,128], data: mat128AF32 }, { shape: [128,128], data: mat128BF32 });
	const resultI32 = addMatrixInt32({ shape: [128,128], data: mat128AI32 }, { shape: [128,128], data: mat128BI32 });
	

	assertEquals(resultFunc, mat128ResultNum);
	assertEquals(resultLoop, mat128ResultNum);
	assertEquals(resultLoopPreAlloc, mat128ResultNum);
	assertEquals(resultPresize, mat128ResultNum);
	assertEquals(resultDynamic, mat128ResultNum);
	assertEquals(flatToNestedArray(resultFlat), mat128ResultNum);
	assertEquals(flatToNestedArray(resultFlatPresize), mat128ResultNum);
	assertEquals(flatToNestedArray(resultFlatDynamic), mat128ResultNum);
	assertEquals(resultF64.data, mat128ResultF64);
	assertEquals(resultF32.data, mat128ResultF32);
	assertEquals(resultI32.data, mat128ResultI32);
});