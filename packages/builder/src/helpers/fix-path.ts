import path from "node:path";

export function fixPath(rootPath: string) {
  process.env.PATH += ":" + path.join(rootPath, "node_modules", ".bin");
}
