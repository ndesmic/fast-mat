import { assertEquals } from "https://deno.land/std@0.179.0/testing/asserts.ts";
import { addMatrixWasmF64, addMatrixWasmSimdF64, addMatrixWasmSimdF32, addMatrixWasmSimdI32 } from "../mat.js";
import { mat128AF64, mat128BF64, mat128ResultF64, mat1AF64, mat1BF64, mat1ResultF64, mat2AF64, mat2BF64, mat2ResultF64, mat16AF64, mat16BF64, mat16ResultF64, mat64AF64, mat64BF64, mat64ResultF64 } from "../data/mat-data-f64.js";
import { mat128AF32, mat128BF32, mat128ResultF32, mat1AF32, mat1BF32, mat1ResultF32, mat2AF32, mat2BF32, mat2ResultF32, mat16AF32, mat16BF32, mat16ResultF32, mat64AF32, mat64BF32, mat64ResultF32 } from "../data/mat-data-f32.js";
import { mat128AI32, mat128BI32, mat128ResultI32, mat1AI32, mat1BI32, mat1ResultI32, mat2AI32, mat2BI32, mat2ResultI32, mat16AI32, mat16BI32, mat16ResultI32, mat64AI32, mat64BI32, mat64ResultI32 } from "../data/mat-data-i32.js";


//F64

Deno.test("Adds 1x1 (WASM F64)", () => {
	const resultWasm = addMatrixWasmF64({ shape: [1,1], data: mat1AF64 }, { shape: [1,1], data: mat1BF64 });
	assertEquals(resultWasm.data, mat1ResultF64);
});

Deno.test("Adds 2x2 (WASM F64)", () => {
	const resultWasm = addMatrixWasmF64({ shape: [2,2], data: mat2AF64 }, { shape: [2,2], data: mat2BF64 });
	assertEquals(resultWasm.data, mat2ResultF64);
});

Deno.test("Adds 16x16 (WASM F64)", () => {
	const resultWasm = addMatrixWasmF64({ shape: [16,16], data: mat16AF64 }, { shape: [16,16], data: mat16BF64 });
	assertEquals(resultWasm.data, mat16ResultF64);
});


Deno.test("Adds 128x128 (WASM F64)", () => {
	const resultWasm = addMatrixWasmF64({ shape: [128,128], data: mat128AF64 }, { shape: [128,128], data: mat128BF64 });
	assertEquals(resultWasm.data, mat128ResultF64);
});


//SIMD F64

Deno.test("Adds 1x1 (SIMD F64)", () => {
	const resultWasm = addMatrixWasmSimdF64({ shape: [1,1], data: mat1AF64 }, { shape: [1,1], data: mat1BF64 });
	assertEquals(resultWasm.data, mat1ResultF64);
});

Deno.test("Adds 2x2 (SIMD F64)", () => {
	const resultWasm = addMatrixWasmSimdF64({ shape: [2,2], data: mat2AF64 }, { shape: [2,2], data: mat2BF64 });
	assertEquals(resultWasm.data, mat2ResultF64);
});

Deno.test("Adds 16x16 (SIMD F64)", () => {
	const resultWasm = addMatrixWasmSimdF64({ shape: [16,16], data: mat16AF64 }, { shape: [16,16], data: mat16BF64 });
	assertEquals(resultWasm.data, mat16ResultF64);
});

Deno.test("Adds 64x64 (SIMD F64)", () => {
	const resultWasm = addMatrixWasmSimdF64({ shape: [64,64], data: mat64AF64 }, { shape: [64,64], data: mat64BF64 });
	assertEquals(resultWasm.data, mat64ResultF64);
});

Deno.test("Adds 128x128 (SIMD F64)", () => {
	const resultWasm = addMatrixWasmSimdF64({ shape: [128,128], data: mat128AF64 }, { shape: [128,128], data: mat128BF64 });
	assertEquals(resultWasm.data, mat128ResultF64);
});

// SIMD F32

Deno.test("Adds 1x1 (SIMD F32)", () => {
	const resultWasm = addMatrixWasmSimdF32({ shape: [1,1], data: mat1AF32 }, { shape: [1,1], data: mat1BF32 });
	assertEquals(resultWasm.data, mat1ResultF32);
});

Deno.test("Adds 2x2 (SIMD F32)", () => {
	const resultWasm = addMatrixWasmSimdF32({ shape: [2,2], data: mat2AF32 }, { shape: [2,2], data: mat2BF32 });
	assertEquals(resultWasm.data, mat2ResultF32);
});

Deno.test("Adds 16x16 (SIMD F32)", () => {
	const resultWasm = addMatrixWasmSimdF32({ shape: [16,16], data: mat16AF32 }, { shape: [16,16], data: mat16BF32 });
	assertEquals(resultWasm.data, mat16ResultF32);
});

Deno.test("Adds 64x64 (SIMD F32)", () => {
	const resultWasm = addMatrixWasmSimdF32({ shape: [64,64], data: mat64AF32 }, { shape: [64,64], data: mat64BF32 });
	assertEquals(resultWasm.data, mat64ResultF32);
});

Deno.test("Adds 128x128 (SIMD F32)", () => {
	const resultWasm = addMatrixWasmSimdF32({ shape: [128,128], data: mat128AF32 }, { shape: [128,128], data: mat128BF32 });
	assertEquals(resultWasm.data, mat128ResultF32);
});

//SIMD I32

Deno.test("Adds 1x1 (SIMD I32)", () => {
	const resultWasm = addMatrixWasmSimdI32({ shape: [1,1], data: mat1AI32 }, { shape: [1,1], data: mat1BI32 });
	assertEquals(resultWasm.data, mat1ResultI32);
});

Deno.test("Adds 2x2 (SIMD I32)", () => {
	const resultWasm = addMatrixWasmSimdI32({ shape: [2,2], data: mat2AI32 }, { shape: [2,2], data: mat2BI32 });
	assertEquals(resultWasm.data, mat2ResultI32);
});

Deno.test("Adds 16x16 (SIMD I32)", () => {
	const resultWasm = addMatrixWasmSimdI32({ shape: [16,16], data: mat16AI32 }, { shape: [16,16], data: mat16BI32 });
	assertEquals(resultWasm.data, mat16ResultI32);
});

Deno.test("Adds 64x64 (SIMD I32)", () => {
	const resultWasm = addMatrixWasmSimdI32({ shape: [64,64], data: mat64AI32 }, { shape: [64,64], data: mat64BI32 });
	assertEquals(resultWasm.data, mat64ResultI32);
});

Deno.test("Adds 128x128 (SIMD I32)", () => {
	const resultWasm = addMatrixWasmSimdI32({ shape: [128,128], data: mat128AI32 }, { shape: [128,128], data: mat128BI32 });
	assertEquals(resultWasm.data, mat128ResultI32);
});