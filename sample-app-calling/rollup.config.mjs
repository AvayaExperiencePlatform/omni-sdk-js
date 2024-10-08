import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import sourcemaps from "rollup-plugin-sourcemaps2";
import { readFileSync } from "fs";

const watchPlugins = () => {
	if (!process.env.ROLLUP_WATCH) {
		// empty unless started with --watch
		return [];
	}

	const https = {
		key: readFileSync("./key.pem"),
		cert: readFileSync("./cert.pem"),
	};

	return [
		sourcemaps(),
		livereload({ https }),
		serve({
			https,
			port: 8080,
			contentBase: "public/",
		}),
	];
};

export default {
	input: "src/index.ts",
	context: "this", // leave the global context as 'this' for jQuery
	output: [
		{
			file: "public/index.js",
			format: "es",
			sourcemap: true,
		},
	],
	plugins: [typescript(), resolve()].concat(watchPlugins()),
};
