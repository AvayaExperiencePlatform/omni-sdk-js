import resolve from "@rollup/plugin-node-resolve";

export default {
	input: "./index.js",
	output: [
		{
			file: "public/app.js",
			format: "es",
		},
	],
	plugins: [resolve()],
};
