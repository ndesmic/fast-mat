const json = JSON.parse(Deno.readTextFileSync("./temp/bench.json"));

let out = "Name, Min(ns), Max(ns), Avg(ns), p75(ns), p95(ns), p99(ns), p995(ns)\n";
for (const bench of json.benches) {
	out += `${bench.name},${bench.results[0].ok.min.toFixed(0)},${bench.results[0].ok.max.toFixed(0)},${bench.results[0].ok.avg.toFixed(0)},${bench.results[0].ok.p75.toFixed(0)},${bench.results[0].ok.p99.toFixed(0)},${bench.results[0].ok.p995.toFixed(0)}\n`
}

console.log(out);