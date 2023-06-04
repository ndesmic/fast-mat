export function sum(values) {
	return values.reduce((sum, v) => sum + v);
}
export function min(values) {
	return values.reduce((min, v) => Math.min(min, v));
}
export function max(values) {
	return values.reduce((max, v) => Math.max(max, v));
}
export function average(values) {
	return sum(values) / values.length;
}

export async function bench(name, options, benchFn){
	options.warmupIterations = options.warmupIterations ?? 200;
	options.iterations = options.iterations ?? 1000;

	for(let i = 0; i < options.warmupIterations; i++){
		await benchFn();
	}

	const start = performance.now();
	for(let i = 0; i < options.iterations; i++){
		await benchFn();
	}
	const elapsed = performance.now() - start;

	return { 
		name,
		group: options.group,
		results: [
			{
				ok : {
					origin: window.location.href,
					n: options.iterations,
					min: NaN, //min(runs),
					max: NaN, //max(runs),
					avg: elapsed / options.iterations * 1_000_000,
					p75: NaN,
					p99: NaN,
					p995: NaN
				}
			}
		]
	};
}