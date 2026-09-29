import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "nocp-space",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-08-16",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      notFoundHandling: "none",
    },
    env: {
      ASSETS: bindings.assets(),
    },
    workersDev: false,
    observability: {
      logs: {
        enabled: true,
      },
    },
  }),
});
