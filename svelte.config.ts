import adapter from "svelte-adapter-bun";
import type { Config } from "@sveltejs/kit";

const config: Config = {
    kit: {
        adapter: adapter(),
        alias: {
            $styles: "src/styles",
            $common: "src/common"
        },
    },
    compilerOptions: {
        runes: true
    }
}

export default config;
