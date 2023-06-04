export function getNormal(mean = 0, standardDeviation = 1) {
	const u1 = Math.random();
	const u2 = Math.random();
	return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * standardDeviation + mean;
}

export function normalSampler(mean, standardDeviation, rounding = x => x) {
	return () => rounding(getNormal(mean, standardDeviation));
}
export function normalIntSampler(mean, standardDeviation) {
	return () => Math.floor(getNormal(mean, standardDeviation));
}
export function uniformSampler(start = 0, end = 1) {
	return () => start + Math.random() * (end - start);
}

export function getMat(rMax, cMax, sampler) {
	const mat = [];
	for (let row = 0; row < rMax; row++) {
		const r = [];
		for (let col = 0; col < cMax; col++) {
			r.push(sampler());
		}
		mat.push(r);
	}
	return mat;
}

export function getMatFlat(rMax, cMax, sampler) {
	const mat = [];
	for (let row = 0; row < rMax; row++) {
		for (let col = 0; col < cMax; col++) {
			mat.push(sampler());
		}
	}
	return mat;
}