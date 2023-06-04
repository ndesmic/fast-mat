import { typeByExtension } from "https://deno.land/std/media_types/mod.ts";
import { extname } from "https://deno.land/std/path/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const args = parse(Deno.args);
const script = args._[0];

console.log(`Running with ${script}`);

function getChromeExecutablePath(){
	//windows
	return `C:/Program Files (x86)/Google/Chrome/Application/chrome.exe`;
}

function launchChrome(url){
	const command = new Deno.Command(getChromeExecutablePath(), {
		args: [
			url
		]
	});
	command.outputSync();
}

const baseDir = ".";

Deno.serve(async req => {
	const url = new URL(req.url);
	let inputPath = url.pathname;

	if (inputPath.endsWith("/")) {
		inputPath += "index";
	} 
	
	if (!inputPath.includes(".")) {
		inputPath += ".html";
	}

	if (inputPath.includes("/web/index.html") && req.method === "POST"){
		const body = await req.json();
		await Deno.writeTextFile(`./temp/${script}.json`, JSON.stringify(body, null, 4));
	}
	
	if(inputPath.includes("favicon.ico")) {
		inputPath = "/web/favicon.ico";
	}

	const serverPath = baseDir + inputPath
	const ext = extname(serverPath);

	if(ext === ".html"){
		let file = await Deno.readTextFile(serverPath);
		file = file.replaceAll("{script}", script);

		return new Response(file, {
			headers: {
				"Content-Type": "text/html",
				"Cross-Origin-Opener-Policy": "same-origin",
				"Cross-Origin-Embedder-Policy": "require-corp"
			}
		});
	} else {
		const file = await Deno.open(serverPath);

		return new Response(file.readable, {
			headers: {
				"Content-Type": typeByExtension(ext),
				"Cross-Origin-Opener-Policy": "same-origin",
				"Cross-Origin-Embedder-Policy": "require-corp"
			}
		});
	}
});

launchChrome("http://localhost:8000/web/index.html");