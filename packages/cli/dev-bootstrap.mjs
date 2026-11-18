import { config } from "dotenv";

config({ path: new URL("./.env.development", import.meta.url), quiet: true });
await import("./dist/index.js");
