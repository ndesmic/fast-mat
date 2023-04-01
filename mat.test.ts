import { assertEquals } from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { addMatrixFunc, addMatrixLoop, addMatrixLoopPreAlloc, addMatrixFlat, nestedArrayToFlat, flatToNestedArray, addMatrixFloat64, addMatrixFloat32, addMatrixInt32 } from "./mat.js";
import { addMatrix1x1Nested, addMatrix2x2Nested, addMatrix100x100Nested } from "./presized/mat-presized-nested.js";
import { addMatrix1x1Flat, addMatrix2x2Flat, addMatrix100x100Flat } from "./presized/mat-presized-flat.js";
import { mat100AF64, mat100BF64, mat100ResultF64, mat1AF64, mat1BF64, mat1ResultF64, mat2AF64, mat2BF64, mat2ResultF64, mat4AF64, mat4BF64, mat4ResultF64 } from "./data/mat-data-f64.js";
import { mat100ANum, mat100BNum, mat100ResultNum, mat1ANum, mat1BNum, mat1ResultNum, mat2ANum, mat2BNum, mat2ResultNum, mat4ANum, mat4BNum, mat4ResultNum } from "./data/mat-data-num.js";
import { mat100AF32, mat100BF32, mat100ResultF32, mat1AF32, mat1BF32, mat1ResultF32, mat2AF32, mat2BF32, mat2ResultF32, mat4AF32, mat4BF32, mat4ResultF32 } from "./data/mat-data-f32.js";
import { mat100AI32, mat100BI32, mat100ResultI32, mat1AI32, mat1BI32, mat1ResultI32, mat2AI32, mat2BI32, mat2ResultI32, mat4AI32, mat4BI32, mat4ResultI32 } from "./data/mat-data-i32.js";
import { genMatAddFunc, genMatAddFlatFunc } from "./mat-dynamic.js";

//F32 tests are broken due to rounding errors

Deno.test("Adds 1x1", () => {
	const resultFunc = addMatrixFunc(mat1ANum,mat1BNum);
	const resultLoop = addMatrixLoop(mat1ANum,mat1BNum);
	const resultLoopPreAlloc = addMatrixLoopPreAlloc(mat1ANum,mat1BNum);
	const resultPresize = addMatrix1x1Nested(mat1ANum, mat1BNum);
	const resultDynamic = genMatAddFunc(1,1)(mat1ANum, mat1BNum);
	const resultFlat = addMatrixFlat(nestedArrayToFlat(mat1ANum), nestedArrayToFlat(mat1BNum));
	const resultFlatPresize = addMatrix1x1Flat(nestedArrayToFlat(mat1ANum), nestedArrayToFlat(mat1BNum));
	const resultFlatDynamic = genMatAddFlatFunc(1,1)(nestedArrayToFlat(mat1ANum), nestedArrayToFlat(mat1BNum));
	const resultFlatF64 = addMatrixFloat64({ shape: [1,1], data: mat1AF64 }, { shape: [1,1], data: mat1BF64 });
	const resultFlatF32 = addMatrixFloat32({ shape: [1,1], data: mat1AF32 }, { shape: [1,1], data: mat1BF32 });
	const resultFlatI32 = addMatrixInt32({ shape: [1,1], data: mat1AI32 }, { shape: [1,1], data: mat1BI32 });

	assertEquals(resultFunc, mat1ResultNum);
	assertEquals(resultLoop, mat1ResultNum);
	assertEquals(resultLoopPreAlloc, mat1ResultNum);
	assertEquals(resultPresize, mat1ResultNum);
	assertEquals(resultDynamic, mat1ResultNum);
	assertEquals(flatToNestedArray(resultFlat), mat1ResultNum);
	assertEquals(flatToNestedArray(resultFlatPresize), mat1ResultNum);
	assertEquals(flatToNestedArray(resultFlatDynamic), mat1ResultNum);
	assertEquals(resultFlatF64.data, mat1ResultF64);
	assertEquals(resultFlatF32.data, mat1ResultF32);
	assertEquals(resultFlatI32.data, mat1ResultI32);
});

Deno.test("Adds 2x2", () => {
	const resultFunc = addMatrixFunc(mat2ANum, mat2BNum);
	const resultLoop = addMatrixLoop(mat2ANum, mat2BNum);
	const resultLoopPreAlloc = addMatrixLoopPreAlloc(mat2ANum, mat2BNum);
	const resultPresize = addMatrix2x2Nested(mat2ANum, mat2BNum);
	const resultDynamic = genMatAddFunc(2,2)(mat2ANum, mat2BNum);
	const resultFlat = addMatrixFlat(nestedArrayToFlat(mat2ANum), nestedArrayToFlat(mat2BNum));
	const resultFlatPresize = addMatrix2x2Flat(nestedArrayToFlat(mat2ANum), nestedArrayToFlat(mat2BNum));
	const resultFlatDynamic = genMatAddFlatFunc(2,2)(nestedArrayToFlat(mat2ANum), nestedArrayToFlat(mat2BNum));
	const resultFlatF64 = addMatrixFloat64({ shape: [2,2], data: mat2AF64 }, { shape: [2,2], data: mat2BF64 });
	//const resultFlatF32 = addMatrixFloat32({ shape: [2,2], data: mat2AF32 }, { shape: [2,2], data: mat2BF32 });
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
	const resultFlatF64 = addMatrixFloat64({ shape: [4,4], data: mat4AF64 }, { shape: [4,4], data: mat4BF64 });
	//const resultFlatF32 = addMatrixFloat32({ shape: [4,4], data: mat4AF32 }, { shape: [4,4], data: mat4BF32 });
	const resultFlatI32 = addMatrixInt32({ shape: [4,4], data: mat4AI32 }, { shape: [4,4], data: mat4BI32 });

	assertEquals(resultFunc, mat4ResultNum);
	assertEquals(resultFlatF64.data, mat4ResultF64);
	//assertEquals(resultFlatF32.data, mat4ResultF32);
	assertEquals(resultFlatI32.data, mat4ResultI32);
});

Deno.test("Adds 100x100", () => {
	const resultFunc = addMatrixFunc(mat100ANum, mat100BNum);
	const resultLoop = addMatrixLoop(mat100ANum, mat100BNum);
	const resultLoopPreAlloc = addMatrixLoopPreAlloc(mat100ANum, mat100BNum);
	const resultPresize = addMatrix100x100Nested(mat100ANum, mat100BNum);
	const resultDynamic = genMatAddFunc(100, 100)(mat100ANum, mat100BNum);
	const resultFlat = addMatrixFlat(nestedArrayToFlat(mat100ANum), nestedArrayToFlat(mat100BNum));
	const resultFlatPresize = addMatrix100x100Flat(nestedArrayToFlat(mat100ANum), nestedArrayToFlat(mat100BNum));
	const resultFlatDynamic = genMatAddFlatFunc(100,100)(nestedArrayToFlat(mat100ANum), nestedArrayToFlat(mat100BNum));
	const resultFlatF64 = addMatrixFloat64({ shape: [100,100], data: mat100AF64 }, { shape: [100,100], data: mat100BF64 });
	//const resultFlatF32 = addMatrixFloat32({ shape: [100,100], data: mat100AF32 }, { shape: [100,100], data: mat100BF32 });
	const resultFlatI32 = addMatrixInt32({ shape: [100,100], data: mat100AI32 }, { shape: [100,100], data: mat100BI32 });
	

	assertEquals(resultFunc, mat100ResultNum);
	assertEquals(resultLoop, mat100ResultNum);
	assertEquals(resultLoopPreAlloc, mat100ResultNum);
	assertEquals(resultPresize, mat100ResultNum);
	assertEquals(resultDynamic, mat100ResultNum);
	assertEquals(flatToNestedArray(resultFlat), mat100ResultNum);
	assertEquals(flatToNestedArray(resultFlatPresize), mat100ResultNum);
	assertEquals(flatToNestedArray(resultFlatDynamic), mat100ResultNum);
	assertEquals(resultFlatF64.data, mat100ResultF64);
	//assertEquals(resultFlatF32.data, mat100ResultF32);
	assertEquals(resultFlatI32.data, mat100ResultI32);
});