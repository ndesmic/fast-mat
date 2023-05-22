const json = JSON.parse(Deno.readTextFileSync("./temp/bench.json"));

let stratOut = "Name, Min(ns), Max(ns), Avg(ns), p75(ns), p95(ns), p99(ns), p995(ns)\n";
for (const bench of json.benches) {
	stratOut += `${bench.name},${bench.results[0].ok.min.toFixed(0)},${bench.results[0].ok.max.toFixed(0)},${bench.results[0].ok.avg.toFixed(0)},${bench.results[0].ok.p75.toFixed(0)},${bench.results[0].ok.p99.toFixed(0)},${bench.results[0].ok.p995.toFixed(0)}\n`
}

Deno.writeTextFileSync("./temp/bench-by-strat.csv", stratOut);

let sizeOut = ""

const benchStrats = json.benches.map(bench => {
	return {
		...bench,
		strategy: /(?<=\().*?(?=\))/.exec(bench.name)[0]
	}
});

const groups = [...new Set(json.benches.map(b => b.group))];

const strats = benchStrats.filter(b => b.group === groups[0]).map(b => b.strategy);

sizeOut += "group," + strats.join(",") + "\n";

for(const group of groups){
	const stratsInGroup = benchStrats.filter(s => s.group === group);
	sizeOut += group + "," + strats.map(strat => stratsInGroup.find(s => s.strategy === strat).results[0].ok.avg).join(",") + "\n";
}

Deno.writeTextFileSync("./temp/bench-by-size.csv", sizeOut);
