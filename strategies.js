export default {
	"func" : {
		name: "Func",
		export : "addMatrixFunc",
		module : "../../mat.js"
	},
	"loop" : {
		name : "Loop",
		export : "addMatrixLoop",
		module : "../../mat.js"
	},
	"loop-prealloc" : {
		name : "Loop Prealloc",
		export : "addMatrixLoopPrealloc",
		module : "../../mat.js"
	},
	"unrolled" : {
		name : "Unrolled",
		export : function(size){
			return `addMatrix${size}x${size}Nested`;
		},
		module : "../presized/mat-presized-nested.js"
	},
	"unrolled-dynamic" : {
		name : "Unrolled Dynamic",
		export : function(size){
			return `addMatrix${size}x${size}Dyn`
		},
		module : "../presized/mat-presized-dynamic.js"
	},
	"flat" : {
		name : "Flat",
		export: "addMatrixFlat",
		module : "../../mat.js",
		inputType : "flatNum"
	},
	"flat-col-major": {
		name: "Flat Column Major",
		export: "addMatrixFlatColMajor",
		module: "../../mat.js",
		inputType: "flatNum"
	},
	"flat-simple": {
		name: "Flat Simple",
		export: "addMatrixFlatSimple",
		module: "../../mat.js",
		inputType: "flatNum"
	},
	"flat-func": {
		name: "Flat Func",
		export: "addMatrixFlatSimpleFunc",
		module: "../../mat.js",
		inputType: "flatNum"
	},
	"flat-unrolled": {
		name: "Flat Unrolled",
		export: function (size) {
			return `addMatrix${size}x${size}Flat`
		},
		module: "../presized/mat-presized-flat.js",
		inputType: "flatNum"
	},
	"f64": {
		name: "F64",
		export: "addMatrixFloat64",
		module: "../../mat.js",
		inputType: "f64"
	},
	"f32": {
		name: "F32",
		export: "addMatrixFloat32",
		module: "../../mat.js",
		inputType: "f32"
	},
	"i32": {
		name: "I32",
		export: "addMatrixInt32",
		module: "../../mat.js",
		inputType: "i32"
	},
	"f64-flat": {
		name: "F64 Flat",
		export: "addMatrixFloat64Flat",
		module: "../../mat.js",
		inputType: "f64"
	},
	"f32-flat": {
		name: "F32 Flat",
		export: "addMatrixFloat32Flat",
		module: "../../mat.js",
		inputType: "f32"
	},
	"i32-flat": {
		name: "I32 Flat",
		export: "addMatrixInt32Flat",
		module: "../../mat.js",
		inputType: "i32"
	},
	"wasm-f64": {
		name: "WASM F64",
		export: "addMatrixWasmF64",
		module: "../../mat.js",
		inputType: "f64"
	},
	"wasm-simd-f64": {
		name: "WASM SIMD F64",
		export: "addMatrixWasmSimdF64",
		module: "../../mat.js",
		inputType: "f64"
	},
	"wasm-simd-f32": {
		name: "WASM SIMD F32",
		export: "addMatrixWasmSimdF32",
		module: "../../mat.js",
		inputType: "f32"
	},
	"wasm-simd-i32": {
		name: "WASM SIMD I32",
		export: "addMatrixWasmSimdI32",
		module: "../../mat.js",
		inputType: "i32"
	},
	"webgl-f32": {
		name: "WebGL F32",
		export: "addMatrixWebGl",
		module: "../../mat-webgl.js",
		inputType: "f32"
	},
	"webgpu-f32": {
		name: "WebGPU F32",
		export: "addMatrixWebGpu",
		module: "../../mat-webgpu.js",
		inputType: "f32"
	}
};