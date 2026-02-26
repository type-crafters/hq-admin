import adapter from "@sveltejs/adapter-auto";
import type { Config } from "@sveltejs/kit";

const config: Config = {
	kit: {
		adapter: adapter(),
		alias: {
			"$styles": "src/styles",
			"$common": "src/common",
				"$interface": "src/common/interface",
				"$enum": "src/common/enum",
				"$util": "src/common/util",
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
