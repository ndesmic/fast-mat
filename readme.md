# Fast Matix Math

This is a bench-mark for observing the differences in various matrix-math implementations.

`deno bench` run the bench mark

These will all build to the `temp` directory.  You need to run all of them for benches to successfully run.

- `deno task build:wasm` will build the .wat files to wasm
- `deno task gen:presized-funcs` will create source-code for hard-coded matrix ops
- `deno task gen:rand-data` will generate random test data
- `deno task gen:web-bench` will generate a set of bench tests for web
- `deno task gen:web-bench-xl` will generate a set of larger example bench tests for web
- `deno task bench` will run benchmarks and write to console
- `deno task bench:json` will run benchmarks and write to `temp/bench.json`
- `deno task bench:web` will run web benchmarks and write to `temp/web-bench.json`
- `deno task run:to-csv` will convert `temp/bench.json` to csv
- `deno task run:to-csv` will convert `temp/web-bench.json` to csv
- `deno task run:to-md` will convert `temp/bench.json` to markdown
- `deno task run:poi` will filter `temp/bench.json` to a series of comparision points in both csv and md
- `deno task run:web:poi` will filter `temp/web-bench.json` to a series of comparision points in both csv and md
- `deno task test` will run tests

Other functions are for outputing bench data in different formats

![Graph of results](matrix.png)

## Strategies

- Func
- Loop
- Loop Prealloc
- unrolled
- unrolled dynamic
- flat
- flat col major
- flat simple
- flat unrolled
- F64
- F32
- I32
- F64 flat
- F32 flat
- I32 flat
- flat func
- WASM F64
- WASM SIMD F64
- WASM SIMD F32
- WASM SIMD I64
- WebGL F32
- WebGPU F32