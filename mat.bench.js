import { 
	addMatrixFlat, 
	addMatrixFlatColMajor, 
	addMatrixFlatSimple, 
	addMatrixFloat64, 
	addMatrixInt32, 
	addMatrixFunc, 
	addMatrixLoop, 
	addMatrixLoopPreAlloc, 
	nestedArrayToFlat, 
addMatrixFlatSimpleFunc} from "./mat.js";
import { 
	addMatrix1x1Nested, 
	addMatrix2x2Nested, 
	addMatrix4x4Nested, 
	addMatrix8x8Nested,
	addMatrix16x16Nested,
	addMatrix32x32Nested,
	addMatrix64x64Nested,
	addMatrix100x100Nested } from "./presized/mat-presized-nested.js";

import {
	addMatrix1x1Flat,
	addMatrix2x2Flat,
	addMatrix4x4Flat,
	addMatrix8x8Flat,
	addMatrix16x16Flat,
	addMatrix32x32Flat,
	addMatrix64x64Flat,
	addMatrix100x100Flat
} from "./presized/mat-presized-flat.js";

import { genMatAddFunc  } from "./mat-dynamic.js";

import {
	mat1ANum, mat1BNum,
	mat2ANum, mat2BNum,
	mat4ANum, mat4BNum,
	mat8ANum, mat8BNum,
	mat16ANum, mat16BNum,
	mat32ANum, mat32BNum,
	mat64ANum, mat64BNum,
	mat100ANum, mat100BNum } from "./data/mat-data-num.js";

import { 
	mat1AF64, mat1BF64,
	mat2AF64, mat2BF64, 
	mat4AF64, mat4BF64, 
	mat8AF64, mat8BF64,
	mat16AF64, mat16BF64,
	mat32AF64, mat32BF64,
	mat64AF64, mat64BF64,
	mat100AF64, mat100BF64  } from "./data/mat-data-f64.js";

import {
	mat1AF32, mat1BF32,
	mat2AF32, mat2BF32,
	mat4AF32, mat4BF32,
	mat8AF32, mat8BF32,
	mat16AF32, mat16BF32,
	mat32AF32, mat32BF32,
	mat64AF32, mat64BF32,
	mat100AF32, mat100BF32 } from "./data/mat-data-f32.js"

import {
	mat1AI32, mat1BI32,
	mat2AI32, mat2BI32,
	mat4AI32, mat4BI32,
	mat8AI32, mat8BI32,
	mat16AI32, mat16BI32,
	mat32AI32, mat32BI32,
	mat64AI32, mat64BI32,
	mat100AI32, mat100BI32
} from "./data/mat-data-i32.js"

const addMatrix1x1Dyn = genMatAddFunc(1,1);
const addMatrix2x2Dyn = genMatAddFunc(2,2);
const addMatrix4x4Dyn = genMatAddFunc(4,4);
const addMatrix8x8Dyn = genMatAddFunc(8, 8);
const addMatrix16x16Dyn = genMatAddFunc(16, 16);
const addMatrix32x32Dyn = genMatAddFunc(32, 32);
const addMatrix64x64Dyn = genMatAddFunc(64, 64);
const addMatrix100x100Dyn = genMatAddFunc(100,100);

const mat1AFlat = nestedArrayToFlat(mat1ANum);
const mat1BFlat = nestedArrayToFlat(mat1BNum);
const mat2AFlat = nestedArrayToFlat(mat2ANum);
const mat2BFlat = nestedArrayToFlat(mat2BNum);
const mat4AFlat = nestedArrayToFlat(mat4ANum);
const mat4BFlat = nestedArrayToFlat(mat4BNum);
const mat8AFlat = nestedArrayToFlat(mat8ANum);
const mat8BFlat = nestedArrayToFlat(mat8BNum);
const mat16AFlat = nestedArrayToFlat(mat16ANum);
const mat16BFlat = nestedArrayToFlat(mat16BNum);
const mat32AFlat = nestedArrayToFlat(mat32ANum);
const mat32BFlat = nestedArrayToFlat(mat32BNum);
const mat64AFlat = nestedArrayToFlat(mat64ANum);
const mat64BFlat = nestedArrayToFlat(mat64BNum);
const mat100AFlat = nestedArrayToFlat(mat100ANum);
const mat100BFlat = nestedArrayToFlat(mat100BNum);

Deno.bench("Add 1x1 (Func)", { group: "1x1" }, () => {
	addMatrixFunc(mat1ANum, mat1BNum);
});

Deno.bench("Add 2x2 (Func)", { group: "2x2" }, () => {
	addMatrixFunc(mat2ANum, mat2BNum);
});

Deno.bench("Add 4x4 (Func)", { group: "4x4" }, () => {
	addMatrixFunc(mat4ANum, mat4BNum);
});

Deno.bench("Add 8x8 (Func)", { group: "8x8" }, () => {
	addMatrixFunc(mat8ANum, mat8BNum);
});

Deno.bench("Add 16x16 (Func)", { group: "16x16" }, () => {
	addMatrixFunc(mat16ANum, mat16BNum);
});

Deno.bench("Add 32x32 (Func)", { group: "32x32" }, () => {
	addMatrixFunc(mat32ANum, mat32BNum);
});

Deno.bench("Add 64x64 (Func)", { group: "64x64" }, () => {
	addMatrixFunc(mat64ANum, mat64BNum);
});

Deno.bench("Add 100x100 (Func)", { group: "100x100" }, () => {
	addMatrixFunc(mat100ANum, mat100BNum);
});

Deno.bench("Add 1x1 (Loop)", { group: "1x1" }, () => {
	addMatrixLoop(mat1ANum, mat1BNum);
});

Deno.bench("Add 2x2 (Loop)", { group: "2x2" }, () => {
	addMatrixLoop(mat2ANum, mat2BNum);
});

Deno.bench("Add 4x4 (Loop)", { group: "4x4" }, () => {
	addMatrixLoop(mat4ANum, mat4BNum);
});

Deno.bench("Add 8x8 (Loop)", { group: "8x8" }, () => {
	addMatrixLoop(mat8ANum, mat8BNum);
});

Deno.bench("Add 16x16 (Loop)", { group: "16x16" }, () => {
	addMatrixLoop(mat16ANum, mat16BNum);
});

Deno.bench("Add 32x32 (Loop)", { group: "32x32" }, () => {
	addMatrixLoop(mat32ANum, mat32BNum);
});

Deno.bench("Add 64x64 (Loop)", { group: "64x64" }, () => {
	addMatrixLoop(mat64ANum, mat64BNum);
});

Deno.bench("Add 100x100 (Loop)", { group: "100x100" }, () => {
	addMatrixLoop(mat100ANum, mat100BNum);
});

Deno.bench("Add 1x1 (Loop Prealloc)", { group: "1x1" }, () => {
	addMatrixLoopPreAlloc(mat1ANum, mat1BNum);
});

Deno.bench("Add 2x2 (Loop Prealloc)", { group: "2x2" }, () => {
	addMatrixLoopPreAlloc(mat2ANum, mat2BNum);
});

Deno.bench("Add 4x4 (Loop Prealloc)", { group: "4x4" }, () => {
	addMatrixLoopPreAlloc(mat4ANum, mat4BNum);
});

Deno.bench("Add 8x8 (Loop Prealloc)", { group: "8x8" }, () => {
	addMatrixLoopPreAlloc(mat8ANum, mat8BNum);
});

Deno.bench("Add 16x16 (Loop Prealloc)", { group: "16x16" }, () => {
	addMatrixLoopPreAlloc(mat16ANum, mat16BNum);
});

Deno.bench("Add 32x32 (Loop Prealloc)", { group: "32x32" }, () => {
	addMatrixLoopPreAlloc(mat32ANum, mat32BNum);
});

Deno.bench("Add 64x64 (Loop Prealloc)", { group: "64x64" }, () => {
	addMatrixLoopPreAlloc(mat64ANum, mat64BNum);
});

Deno.bench("Add 100x100 (Loop Prealloc)", { group: "100x100" }, () => {
	addMatrixLoopPreAlloc(mat100ANum, mat100BNum);
});

Deno.bench("Add 1x1 (unrolled)", { group: "1x1" }, () => {
	addMatrix1x1Nested(mat1ANum, mat1BNum);
});

Deno.bench("Add 2x2 (unrolled)", { group: "2x2"}, () => {
	addMatrix2x2Nested(mat2ANum, mat2BNum);
});

Deno.bench("Add 4x4 (unrolled)", { group: "4x4" }, () => {
	addMatrix4x4Nested(mat4ANum, mat4BNum);
});

Deno.bench("Add 8x8 (unrolled)", { group: "8x8" }, () => {
	addMatrix8x8Nested(mat8ANum, mat8BNum);
});

Deno.bench("Add 16x16 (unrolled)", { group: "16x16" }, () => {
	addMatrix16x16Nested(mat16ANum, mat16BNum);
});

Deno.bench("Add 32x32 (unrolled)", { group: "32x32" }, () => {
	addMatrix32x32Nested(mat32ANum, mat32BNum);
});

Deno.bench("Add 64x64 (unrolled)", { group: "64x64" }, () => {
	addMatrix64x64Nested(mat64ANum, mat64BNum);
});

Deno.bench("Add 100x100 (unrolled)", { group: "100x100"}, () => {
	addMatrix100x100Nested(mat100ANum, mat100BNum);
});

Deno.bench("Add 1x1 (unrolled dynamic)", { group: "1x1" }, () => {
	addMatrix1x1Dyn(mat1ANum, mat1BNum);
});

Deno.bench("Add 2x2 (unrolled dynamic)", { group: "2x2" }, () => {
	addMatrix2x2Dyn(mat2ANum, mat2BNum);
});

Deno.bench("Add 4x4 (unrolled dynamic)", { group: "4x4" }, () => {
	addMatrix4x4Dyn(mat4ANum, mat4BNum);
});

Deno.bench("Add 8x8 (unrolled dynamic)", { group: "8x8" }, () => {
	addMatrix8x8Dyn(mat8ANum, mat8BNum);
});

Deno.bench("Add 16x16 (unrolled dynamic)", { group: "16x16" }, () => {
	addMatrix16x16Dyn(mat16ANum, mat16BNum);
});

Deno.bench("Add 32x32 (unrolled dynamic)", { group: "32x32" }, () => {
	addMatrix32x32Dyn(mat32ANum, mat32BNum);
});

Deno.bench("Add 64x64 (unrolled dynamic)", { group: "64x64" }, () => {
	addMatrix64x64Dyn(mat64ANum, mat64BNum);
});

Deno.bench("Add 100x100 (unrolled dynamic)", { group: "100x100" }, () => {
	addMatrix100x100Dyn(mat100ANum, mat100BNum);
});

Deno.bench("Add 1x1 (flat)", { group: "1x1" }, () => {
	addMatrixFlat(mat1AFlat, mat1BFlat);
});

Deno.bench("Add 2x2 (flat)", { group: "2x2" }, () => {
	addMatrixFlat(mat2AFlat, mat2BFlat);
});

Deno.bench("Add 4x4 (flat)", { group: "4x4" }, () => {
	addMatrixFlat(mat4AFlat, mat4BFlat);
});

Deno.bench("Add 8x8 (flat)", { group: "8x8" }, () => {
	addMatrixFlat(mat8AFlat, mat8BFlat);
});

Deno.bench("Add 16x16 (flat)", { group: "16x16" }, () => {
	addMatrixFlat(mat16AFlat, mat16BFlat);
});

Deno.bench("Add 32x32 (flat)", { group: "32x32" }, () => {
	addMatrixFlat(mat32AFlat, mat32BFlat);
});

Deno.bench("Add 64x64 (flat)", { group: "64x64" }, () => {
	addMatrixFlat(mat64AFlat, mat64BFlat);
});

Deno.bench("Add 100x100 (flat)", { group: "100x100" }, () => {
	addMatrixFlat(mat100AFlat, mat100BFlat);
});

Deno.bench("Add 1x1 (flat col major)", { group: "1x1" }, () => {
	addMatrixFlatColMajor(mat1AFlat, mat1BFlat);
});

Deno.bench("Add 2x2 (flat col major)", { group: "2x2" }, () => {
	addMatrixFlatColMajor(mat2AFlat, mat2BFlat);
});

Deno.bench("Add 4x4 (flat col major)", { group: "4x4" }, () => {
	addMatrixFlatColMajor(mat4AFlat, mat4BFlat);
});

Deno.bench("Add 8x8 (flat col major)", { group: "8x8" }, () => {
	addMatrixFlatColMajor(mat8AFlat, mat8BFlat);
});

Deno.bench("Add 16x16 (flat col major)", { group: "16x16" }, () => {
	addMatrixFlatColMajor(mat16AFlat, mat16BFlat);
});

Deno.bench("Add 32x32 (flat col major)", { group: "32x32" }, () => {
	addMatrixFlatColMajor(mat32AFlat, mat32BFlat);
});

Deno.bench("Add 64x64 (flat col major)", { group: "64x64" }, () => {
	addMatrixFlatColMajor(mat64AFlat, mat64BFlat);
});

Deno.bench("Add 100x100 (flat col major)", { group: "100x100" }, () => {
	addMatrixFlatColMajor(mat100AFlat, mat100BFlat);
});

Deno.bench("Add 1x1 (flat simple)", { group: "1x1" }, () => {
	addMatrixFlatSimple(mat1AFlat, mat1BFlat);
});

Deno.bench("Add 2x2 (flat simple)", { group: "2x2" }, () => {
	addMatrixFlatSimple(mat2AFlat, mat2BFlat);
});

Deno.bench("Add 4x4 (flat simple)", { group: "4x4" }, () => {
	addMatrixFlatSimple(mat4AFlat, mat4BFlat);
});

Deno.bench("Add 8x8 (flat simple)", { group: "8x8" }, () => {
	addMatrixFlatSimple(mat8AFlat, mat8BFlat);
});

Deno.bench("Add 16x16 (flat simple)", { group: "16x16" }, () => {
	addMatrixFlatSimple(mat16AFlat, mat16BFlat);
});

Deno.bench("Add 32x32 (flat simple)", { group: "32x32" }, () => {
	addMatrixFlatSimple(mat32AFlat, mat32BFlat);
});

Deno.bench("Add 64x64 (flat simple)", { group: "64x64" }, () => {
	addMatrixFlatSimple(mat64AFlat, mat64BFlat);
});

Deno.bench("Add 100x100 (flat simple)", { group: "100x100" }, () => {
	addMatrixFlatSimple(mat100AFlat, mat100BFlat);
});

Deno.bench("Add 1x1 (flat unrolled)", { group: "1x1" }, () => {
	addMatrix1x1Flat(mat1AFlat, mat1BFlat);
});

Deno.bench("Add 2x2 (flat unrolled)", { group: "2x2" }, () => {
	addMatrix2x2Flat(mat2AFlat, mat2BFlat);
});

Deno.bench("Add 4x4 (flat unrolled)", { group: "4x4" }, () => {
	addMatrix4x4Flat(mat4AFlat, mat4BFlat);
});

Deno.bench("Add 8x8 (flat unrolled)", { group: "8x8" }, () => {
	addMatrix8x8Flat(mat8AFlat, mat8BFlat);
});

Deno.bench("Add 16x16 (flat unrolled)", { group: "16x16" }, () => {
	addMatrix16x16Flat(mat16AFlat, mat16BFlat);
});

Deno.bench("Add 32x32 (flat unrolled)", { group: "32x32" }, () => {
	addMatrix32x32Flat(mat32AFlat, mat32BFlat);
});

Deno.bench("Add 64x64 (flat unrolled)", { group: "64x64" }, () => {
	addMatrix64x64Flat(mat64AFlat, mat64BFlat);
});

Deno.bench("Add 100x100 (flat unrolled)", { group: "100x100" }, () => {
	addMatrix100x100Flat(mat100AFlat, mat100BFlat);
});

Deno.bench("Add 1x1 (F64)", { group: "1x1" }, () => {
	addMatrixFloat64({ shape: [1,1], data: mat1AF64 }, { shape: [1,1], data: mat1BF64 });
});

Deno.bench("Add 2x2 (F64)", { group: "2x2" }, () => {
	addMatrixFloat64({ shape: [2,2], data: mat2AF64 }, { shape: [2,2], data: mat2BF64 });
});

Deno.bench("Add 4x4 (F64)", { group: "4x4" }, () => {
	addMatrixFloat64({ shape: [4, 4], data: mat4AF64 }, { shape: [4, 4], data: mat4BF64 });
});

Deno.bench("Add 8x8 (F64)", { group: "8x8" }, () => {
	addMatrixFloat64({ shape: [8, 8], data: mat8AF64 }, { shape: [8, 8], data: mat8BF64 });
});

Deno.bench("Add 16x16 (F64)", { group: "16x16" }, () => {
	addMatrixFloat64({ shape: [16, 16], data: mat16AF64 }, { shape: [16, 16], data: mat16BF64 });
});

Deno.bench("Add 32x32 (F64)", { group: "32x32" }, () => {
	addMatrixFloat64({ shape: [32, 32], data: mat32AF64 }, { shape: [32, 32], data: mat32BF64 });
});

Deno.bench("Add 64x64 (F64)", { group: "64x64" }, () => {
	addMatrixFloat64({ shape: [64, 64], data: mat64AF64 }, { shape: [64, 64], data: mat64BF64 });
});

Deno.bench("Add 100x100 (F64)", { group: "100x100" }, () => {
	addMatrixFloat64({ shape: [100, 100], data: mat100AF64 }, { shape: [100, 100], data: mat100BF64 });
});

Deno.bench("Add 1x1 (F32)", { group: "1x1" }, () => {
	addMatrixFloat64({ shape: [1, 1], data: mat1AF32 }, { shape: [1, 1], data: mat1BF32 });
});

Deno.bench("Add 2x2 (F32)", { group: "2x2" }, () => {
	addMatrixFloat64({ shape: [2, 2], data: mat2AF32 }, { shape: [2, 2], data: mat2BF32 });
});

Deno.bench("Add 4x4 (F32)", { group: "4x4" }, () => {
	addMatrixFloat64({ shape: [4, 4], data: mat4AF32 }, { shape: [4, 4], data: mat4BF32 });
});

Deno.bench("Add 8x8 (F32)", { group: "8x8" }, () => {
	addMatrixFloat64({ shape: [8, 8], data: mat8AF32 }, { shape: [8, 8], data: mat8BF32 });
});

Deno.bench("Add 16x16 (F32)", { group: "16x16" }, () => {
	addMatrixFloat64({ shape: [16, 16], data: mat16AF32 }, { shape: [16, 16], data: mat16BF32 });
});

Deno.bench("Add 32x32 (F32)", { group: "32x32" }, () => {
	addMatrixFloat64({ shape: [32, 32], data: mat32AF32 }, { shape: [32, 32], data: mat32BF32 });
});

Deno.bench("Add 64x64 (F32)", { group: "64x64" }, () => {
	addMatrixFloat64({ shape: [64, 64], data: mat64AF32 }, { shape: [64, 64], data: mat64BF32 });
});

Deno.bench("Add 100x100 (F32)", { group: "100x100" }, () => {
	addMatrixFloat64({ shape: [100, 100], data: mat100AF32 }, { shape: [100, 100], data: mat100BF32 });
});

Deno.bench("Add 1x1 (I32)", { group: "1x1" }, () => {
	addMatrixInt32({ shape: [1, 1], data: mat1AI32 }, { shape: [1, 1], data: mat1BI32 });
});

Deno.bench("Add 2x2 (I32)", { group: "2x2" }, () => {
	addMatrixInt32({ shape: [2, 2], data: mat2AI32 }, { shape: [2, 2], data: mat2BI32 });
});

Deno.bench("Add 4x4 (I32)", { group: "4x4" }, () => {
	addMatrixInt32({ shape: [4, 4], data: mat4AI32 }, { shape: [4, 4], data: mat4BI32 });
});

Deno.bench("Add 8x8 (I32)", { group: "8x8" }, () => {
	addMatrixInt32({ shape: [8, 8], data: mat8AI32 }, { shape: [8, 8], data: mat8BI32 });
});

Deno.bench("Add 16x16 (I32)", { group: "16x16" }, () => {
	addMatrixInt32({ shape: [16, 16], data: mat16AI32 }, { shape: [16, 16], data: mat16BI32 });
});

Deno.bench("Add 32x32 (I32)", { group: "32x32" }, () => {
	addMatrixInt32({ shape: [32, 32], data: mat32AI32 }, { shape: [32, 32], data: mat32BI32 });
});

Deno.bench("Add 64x64 (I32)", { group: "64x64" }, () => {
	addMatrixInt32({ shape: [64, 64], data: mat64AI32 }, { shape: [64, 64], data: mat64BI32 });
});

Deno.bench("Add 100x100 (I32)", { group: "100x100" }, () => {
	addMatrixInt32({ shape: [100, 100], data: mat100AI32 }, { shape: [100, 100], data: mat100BI32 });
});

Deno.bench("Add 1x1 (flat func)", { group: "1x1", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat1AFlat, mat1BFlat);
});

Deno.bench("Add 2x2 (flat func)", { group: "2x2", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat2AFlat, mat2BFlat);
});

Deno.bench("Add 4x4 (flat func)", { group: "4x4", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat4AFlat, mat4BFlat);
});

Deno.bench("Add 8x8 (flat func)", { group: "8x8", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat8AFlat, mat8BFlat);
});

Deno.bench("Add 16x16 (flat func)", { group: "16x16", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat16AFlat, mat16BFlat);
});

Deno.bench("Add 32x32 (flat func)", { group: "32x32", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat32AFlat, mat32BFlat);
});

Deno.bench("Add 64x64 (flat func)", { group: "64x64", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat64AFlat, mat64BFlat);
});

Deno.bench("Add 100x100 (flat func)", { group: "100x100", baseline: true }, () => {
	addMatrixFlatSimpleFunc(mat100AFlat, mat100BFlat);
});