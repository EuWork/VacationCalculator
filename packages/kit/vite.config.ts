import { createViteConfig, getDependenciesFromPackageLock } from "@app/builder";

export default createViteConfig({
  externals: [...getDependenciesFromPackageLock(require("../../package-lock.json"))],
  mode: "lib",
  formats: ["es", "cjs"],
});
