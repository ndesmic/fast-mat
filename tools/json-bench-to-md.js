const json = JSON.parse(Deno.readTextFileSync("./temp/bench.json"));

let out = `
| Name | min | max | avg | p75 | p99 | p995 |
|------|-----|-----|-----|-----|-----|------|
`;
for(const bench of json.benches){
	out += `|${bench.name}|${bench.results[0].ok.min.toFixed(0)}ns|${bench.results[0].ok.max.toFixed(0)}ns|${bench.results[0].ok.avg.toFixed(0)}ns|${bench.results[0].ok.p75.toFixed(0)}ns|${bench.results[0].ok.p99.toFixed(0)}ns|${bench.results[0].ok.p995.toFixed(0)}ns|\n`
}

Deno.writeTextFileSync("./temp/bench-by-strat.md", out);