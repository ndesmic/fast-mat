//Gets various comparisons of interest
import { parse } from "https://deno.land/std/flags/mod.ts";
const args = parse(Deno.args);

const json = JSON.parse(Deno.readTextFileSync(args._[0]));

const benchStrats = json.benches.map(bench => {
	return {
		...bench,
		strategy: /(?<=\().*?(?=\))/.exec(bench.name)[0]
	}
});

const groups = [...new Set(json.benches.map(b => b.group))];

function writePointOfInterest(name, strats){
	let csvOut = "";
	let mdOut = "";

	csvOut += "size," + strats.map(s => `${s} (avg ns)`).join(",") + "\n";
	mdOut += "|size|" + strats.map(s => `${s} (avg ns)`).join("|") + "|\n" + "|-".repeat(strats.length + 1) + "|\n";

	for (const group of groups) {
		const stratsInGroup = benchStrats.filter(s => s.group === group);

		csvOut += group + ",";
		mdOut += group + "|";

		for(const strat of strats){
			const foundStrat = stratsInGroup.find(s => s.strategy === strat);
			if(foundStrat){
				csvOut += foundStrat.results[0].ok.avg + ",";
				mdOut += foundStrat.results[0].ok.avg + "|";
			} else {
				console.log(`No matching strat ${strat} for group ${group}`)
			}
		}

		mdOut = mdOut.slice(0, -1) + "\n";
		csvOut = csvOut.slice(0, -1) + "\n";
	}

	Deno.writeTextFileSync(`./temp/poi-${name}.csv`, csvOut);
	Deno.writeTextFileSync(`./temp/poi-${name}.md`, mdOut);
}

writePointOfInterest("naive", ["Func", "Loop"]);
writePointOfInterest("prealloc", ["Func", "Loop", "Loop Prealloc"]);
//writePointOfInterest("unrolled", ["Func", "Loop", "Loop Prealloc", "Unrolled", "Unrolled dynamic"]);
writePointOfInterest("simple", ["Func", "Loop", "Loop Prealloc", "Flat Simple"]);
writePointOfInterest("typed", ["Flat Simple", "F64 Flat", "F32 Flat", "I32 Flat"]);
writePointOfInterest("wasm", ["Loop Prealloc", "Flat Simple", "F64 Flat", "WASM F64"]);
writePointOfInterest("simd", ["Loop Prealloc", "Flat Simple", "F64", "WASM F64", "WASM SIMD F64"]);
writePointOfInterest("typed-simd", ["F64", "F32", "I32", "WASM F64", "WASM SIMD F64", "WASM SIMD F32", "WASM SIMD I32"]);
writePointOfInterest("gpu", ["Loop Prealloc", "Flat Simple", "F32", "WASM SIMD F32", "WebGL F32", "WebGPU F32"]);