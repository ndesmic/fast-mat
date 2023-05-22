//Gets various comparisons of interest
const json = JSON.parse(Deno.readTextFileSync("./temp/bench.json"));

const benchStrats = json.benches.map(bench => {
	return {
		...bench,
		strategy: /(?<=\().*?(?=\))/.exec(bench.name)[0]
	}
});

const groups = [...new Set(json.benches.map(b => b.group))];

// Typed POI
{
let csvOut = "";
let mdOut = "";
const strats = ["F64", "F64 flat", "F32", "F32 flat", "I32", "I32 flat"]

csvOut += "size," + strats.map(s => `${s} (avg ns)`).join(",") + "\n";
mdOut += "|size|" + strats.map(s => `${s} (avg ns)`).join("|") + "|\n" + "|-".repeat(strats.length + 1) + "|\n";

for (const group of groups) {
	const stratsInGroup = benchStrats.filter(s => s.group === group);
	csvOut += group + "," + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join(",") + "\n";

	mdOut += group + "|" + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join("|") + "|\n";
}

Deno.writeTextFileSync("./temp/poi-typed.csv", csvOut);
Deno.writeTextFileSync("./temp/poi-typed.md", mdOut);
}

//WASM POI
{
let csvOut = "";
let mdOut = "";
const strats = ["Loop", "Loop Prealloc", "unrolled", "flat", "flat simple", "WASM F64"]

csvOut += "size," + strats.map(s => `${s} (avg ns)`).join(",") + "\n";
mdOut += "|size|" + strats.map(s => `${s} (avg ns)`).join("|") + "|\n" + "|-".repeat(strats.length + 1) + "|\n";

for (const group of groups) {
	const stratsInGroup = benchStrats.filter(s => s.group === group);
	csvOut += group + "," + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join(",") + "\n";

	mdOut += group + "|" + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join("|") + "|\n";
}

Deno.writeTextFileSync("./temp/poi-wasm.csv", csvOut);
Deno.writeTextFileSync("./temp/poi-wasm.md", mdOut);
}

//SIMD POI
{
	let csvOut = "";
	let mdOut = "";
	const strats = ["Loop", "Loop Prealloc", "flat", "flat simple", "F64", "WASM F64", "WASM SIMD F64"]

	csvOut += "size," + strats.map(s => `${s} (avg ns)`).join(",") + "\n";
	mdOut += "|size|" + strats.map(s => `${s} (avg ns)`).join("|") + "|\n" + "|-".repeat(strats.length + 1) + "|\n";

	for (const group of groups) {
		const stratsInGroup = benchStrats.filter(s => s.group === group);
		csvOut += group + "," + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join(",") + "\n";

		mdOut += group + "|" + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join("|") + "|\n";
	}

	Deno.writeTextFileSync("./temp/poi-simd.csv", csvOut);
	Deno.writeTextFileSync("./temp/poi-simd.md", mdOut);
}

//SIMD POI
{
	let csvOut = "";
	let mdOut = "";
	const strats = ["F64", "F32", "I32", "WASM F64", "WASM SIMD F64", "WASM SIMD F32", "WASM SIMD I32"];

	csvOut += "size," + strats.map(s => `${s} (avg ns)`).join(",") + "\n";
	mdOut += "|size|" + strats.map(s => `${s} (avg ns)`).join("|") + "|\n" + "|-".repeat(strats.length + 1) + "|\n";

	for (const group of groups) {
		const stratsInGroup = benchStrats.filter(s => s.group === group);
		csvOut += group + "," + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join(",") + "\n";

		mdOut += group + "|" + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join("|") + "|\n";
	}

	Deno.writeTextFileSync("./temp/poi-typed-simd.csv", csvOut);
	Deno.writeTextFileSync("./temp/poi-typed-simd.md", mdOut);
}