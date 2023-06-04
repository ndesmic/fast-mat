const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const module = device.createShaderModule({
	code: `
		struct Matrix {
			size: vec2<u32>,
			data: array<f32>
		}

		@group(0) @binding(0)
		var<storage, read> inputA: Matrix;

		@group(0) @binding(1)
		var<storage, read> inputB: Matrix;

		@group(0) @binding(2)
		var<storage, read_write> output: array<f32>;

		@compute @workgroup_size(8, 8)
		fn main(
			@builtin(global_invocation_id) global_id: vec3<u32>
		){
			if(global_id.x > inputA.size.x || global_id.y > inputA.size.y){
				return;
			}
			let idx = (inputA.size.x * global_id.y) + global_id.x;
			output[idx] = inputA.data[idx] + inputB.data[idx];
		}
	`
});

const bindGroupLayout = device.createBindGroupLayout({
	entries: [
		{
			binding: 0,
			visibility: GPUShaderStage.COMPUTE,
			buffer: {
				type: "read-only-storage"
			}
		},
		{
			binding: 1,
			visibility: GPUShaderStage.COMPUTE,
			buffer: {
				type: "read-only-storage"
			}
		},
		{
			binding: 2,
			visibility: GPUShaderStage.COMPUTE,
			buffer: {
				type: "storage"
			}
		}
	]
});

const pipeline = device.createComputePipeline({
	layout: device.createPipelineLayout({
		bindGroupLayouts: [bindGroupLayout]
	}),
	compute: {
		module,
		entryPoint: "main"
	}
});


export async function addMatrixWebGpu(a, b){
	const dataSize = (a.shape[0] * a.shape[1] * 4);
	const bufferSize = dataSize + 8; //adding dimensions to front
	const alignedBufferSize = Math.ceil(bufferSize / 16) * 16; //must meet 16-byte alignment

	const inputA = device.createBuffer({
		size: alignedBufferSize,
		usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
	});

	const inputB = device.createBuffer({
		size: alignedBufferSize,
		usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
	});

	const output = device.createBuffer({
		size: bufferSize,
		usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
	});

	const stagingBuffer = device.createBuffer({
		size: dataSize,
		usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
	});

	const bindGroup = device.createBindGroup({
		layout: bindGroupLayout,
		entries: [
			{
				binding: 0,
				resource: {
					buffer: inputA
				}
			},
			{
				binding: 1,
				resource: {
					buffer: inputB
				}
			},
			{
				binding: 2,
				resource: {
					buffer: output
				}
			}
		]
	});

	//encode shape
	device.queue.writeBuffer(inputA, 0, new Int32Array(a.shape));
	device.queue.writeBuffer(inputA, 8, a.data);
	device.queue.writeBuffer(inputB, 0, new Int32Array(b.shape));
	device.queue.writeBuffer(inputB, 8, b.data);
	const commandEncoder = device.createCommandEncoder();
	const passEncoder = commandEncoder.beginComputePass();
	passEncoder.setPipeline(pipeline);
	passEncoder.setBindGroup(0, bindGroup);
	passEncoder.dispatchWorkgroups(Math.ceil(a.shape[0] / 8), Math.ceil(a.shape[1] / 8));
	passEncoder.end();
	commandEncoder.copyBufferToBuffer(output, 0, stagingBuffer, 0, dataSize);
	const commands = commandEncoder.finish();
	device.queue.submit([commands]);

	await stagingBuffer.mapAsync(GPUMapMode.READ, 0, dataSize);
	const copyArrayBuffer = stagingBuffer.getMappedRange(0, dataSize);

	const data = copyArrayBuffer.slice();
	stagingBuffer.unmap(); 

	return {
		shape: a.shape,
		data: new Float32Array(data)
	}
}