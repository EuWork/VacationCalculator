import { execSync } from "node:child_process";
import { ExecSyncOptionsWithStringEncoding } from "child_process";

import { fixPath } from "./helpers/fix-path";

export function buildCurrentPackage(buildTypes = true) {
  const rootPath = process.cwd();
  fixPath(rootPath);

  const execOptions: ExecSyncOptionsWithStringEncoding = {
    cwd: rootPath,
    stdio: "inherit",
    encoding: "utf-8",
    env: { PATH: process.env.PATH, NODE_ENV: process.env.NODE_ENV, VITE_CJS_IGNORE_WARNING: "true" },
  };

  try {
    execSync("vite build", execOptions);
    if (buildTypes) execSync("nest build", execOptions);
  } catch (e) {
    throw new Error("Build failed");
  }
}
