const canvas = document.createElement("canvas");
canvas.height = 256;
canvas.width = 256;
const context = canvas.getContext("webgl2");

document.body.append(canvas);

context.getExtension("EXT_color_buffer_float");

function createDataTexture(context, data, textureIndex = 0, width = 32, height = 32) {
	context.activeTexture(context.TEXTURE0 + textureIndex);
	const texture = context.createTexture();
	context.bindTexture(context.TEXTURE_2D, texture);

	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

	context.texImage2D(context.TEXTURE_2D, 0, context.R32F, width, height, 0, context.RED, context.FLOAT, data);
}

function compileProgram(context){
	const vertexShaderText = `#version 300 es
		precision highp float;
		in vec3 aPosition;
		in vec2 aUV;

		out vec2 uv;

		void main(){
			gl_Position = vec4(aPosition, 1.0);
			uv = aUV;
		}
	`;
	const vertexShader = context.createShader(context.VERTEX_SHADER);
	context.shaderSource(vertexShader, vertexShaderText);
	context.compileShader(vertexShader);

	const fragmentShaderText = `#version 300 es
		precision highp float;
		uniform sampler2D samplerA;
		uniform sampler2D samplerB;

		in vec2 uv;

		out vec4 glColor;

		void main(){
			glColor = vec4(texture(samplerA, uv).r + texture(samplerB, uv).r, 0.0, 0.0, 1.0);
		}
	`;
	const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
	context.shaderSource(fragmentShader, fragmentShaderText);
	context.compileShader(fragmentShader);

	if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
		console.error(`⚠ Failed to compile vertex shader: ${context.getShaderInfoLog(vertexShader)}`);
	}
	if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) {
		console.error(`⚠ Failed to compile fragment shader: ${context.getShaderInfoLog(fragmentShader)}`);
	}

	const program = context.createProgram();

	context.attachShader(program, vertexShader);
	context.attachShader(program, fragmentShader);

	context.linkProgram(program);
	context.useProgram(program);

	return program;
}

function createScene(context, program){
	const positions = new Float32Array([
		-1.0, -1.0,
		1.0, -1.0,
		1.0, 1.0,
		-1.0, 1.0
	]);
	const positionBuffer = context.createBuffer();
	context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
	context.bufferData(context.ARRAY_BUFFER, positions, context.STATIC_DRAW);

	const positionLocation = context.getAttribLocation(program, "aPosition");
	context.enableVertexAttribArray(positionLocation);
	context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);

	const uvs = new Float32Array([
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
	]);
	const uvBuffer = context.createBuffer();
	context.bindBuffer(context.ARRAY_BUFFER, uvBuffer);
	context.bufferData(context.ARRAY_BUFFER, uvs, context.STATIC_DRAW);

	const texCoordLocation = context.getAttribLocation(program, "aUV");
	context.enableVertexAttribArray(texCoordLocation);
	context.vertexAttribPointer(texCoordLocation, 2, context.FLOAT, false, 0, 0);

	const indicies = new Uint16Array([
		0, 1, 2,
		0, 2, 3
	]);
	const indexBuffer = context.createBuffer();
	context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
	context.bufferData(context.ELEMENT_ARRAY_BUFFER, indicies, context.STATIC_DRAW);

	const samplerALocation = context.getUniformLocation(program, "samplerA");
	const samplerBLocation = context.getUniformLocation(program, "samplerB");
	context.uniform1i(samplerALocation, 0);
	context.uniform1i(samplerBLocation, 1);
}

function createFramebuffer(context, width, height){
	const framebufferTexture = context.createTexture();
	context.bindTexture(context.TEXTURE_2D, framebufferTexture);
	context.texImage2D(context.TEXTURE_2D, 0, context.R32F, width, height, 0, context.RED, context.FLOAT, null);

	const framebuffer = context.createFramebuffer();
	context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
	context.framebufferTexture2D(context.FRAMEBUFFER, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, framebufferTexture, 0)
}

const program = compileProgram(context);
createScene(context, program);
createFramebuffer(context, canvas.width, canvas.height);

export function addMatrixWebGl(a, b){
	context.viewport(0, 0, a.shape[0], a.shape[1]);
	createDataTexture(context, a.data, 0, a.shape[0], b.shape[1]);
	createDataTexture(context, b.data, 1, b.shape[0], b.shape[1]);
	canvas.width = a.shape[0];
	canvas.height = a.shape[1];
	context.drawElements(context.TRIANGLES, 6, context.UNSIGNED_SHORT, 0);

	const result = new Float32Array(a.shape[0] * a.shape[1]);
	context.readPixels(0, 0, a.shape[0], a.shape[1], context.RED, context.FLOAT, result);

	return {
		shape: a.shape,
		data: result
	};
}