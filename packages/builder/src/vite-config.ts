import { defineConfig, LibraryFormats, ServerOptions } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "node:path";
import swc from "rollup-plugin-swc";

import { conditionalReplacementPlugin } from "./conditional-replacement-plugin";

type PluginOptions = { minify: boolean };

export const isProd = process.env.NODE_ENV === "production";
const rootPath = process.cwd();

function getPlugins({ minify }: PluginOptions) {
  return [
    swc({
      rollup: { include: /\.[mc]?[jt]sx?$/, exclude: /node_modules/ },
      sourceMaps: true,
      jsc: {
        target: isProd ? "es2020" : "esnext",
        parser: { syntax: "typescript", tsx: true, decorators: true },
        transform: { decoratorMetadata: true, react: { runtime: "automatic" } },
      },
    }),
    react().slice(0, 2),
    tsconfigPathsPlugin(),
    svgrPlugin({ svgrOptions: { ref: true } }),
    vanillaExtractPlugin({ identifiers: minify ? "short" : "debug" }),
    conditionalReplacementPlugin(),
  ];
}

type ManualChunks = [string, string[]][];

type ConfigOptions = {
  externals: string[];
  manualChunks?: ManualChunks;
  manualChunksWorkspaces?: { manualChunks: ManualChunks; workspaces: string[] };
  server?: ServerOptions;
} & ({ mode: "app" } | { mode: "lib"; formats?: LibraryFormats[] });

export function createViteConfig(options: ConfigOptions) {
  const minify = isProd;

  return defineConfig({
    server: options.server,
    mode: minify ? "production" : "development",
    define: { "process.env.NODE_ENV": `"${process.env.NODE_ENV}"` },
    plugins: getPlugins({ minify }),
    esbuild: false,
    build: {
      outDir: path.join(rootPath, "dist"),
      minify: minify ? "terser" : false,
      ssr: options.mode === "lib",
      lib:
        options.mode === "lib"
          ? { entry: { main: path.resolve(rootPath, "src/main.ts") }, formats: options.formats ?? ["cjs", "es"] }
          : undefined,
      rollupOptions: {
        onwarn(warning, handler) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          if (warning.code === "THIS_IS_UNDEFINED") return;
          if (warning.code === "SOURCEMAP_ERROR") return;
          if (warning.code === "CIRCULAR_DEPENDENCY") return;
          if (warning.code === "EMPTY_BUNDLE") return;
          if (warning.code === "INVALID_ANNOTATION") return;
          handler(warning);
        },
        external: [...options.externals, "*.woff2"],
        output: {
          interop: "auto",
          manualChunks: (id) => rollupManualChunks(id, options.manualChunks, options.manualChunksWorkspaces),
        },
      },
      sourcemap: isProd ? true : "inline",
    },
  });
}

function rollupManualChunks(
  id: string,
  manualChunks: ConfigOptions["manualChunks"],
  manualChunksWorkspaces: { manualChunks: ManualChunks; workspaces: string[] } | undefined,
) {
  const exportChunkDivider = "_chunkExport";

  if (id.includes(exportChunkDivider)) {
    const pathAndChunkNameRaw = id.split(exportChunkDivider)[0];
    return pathAndChunkNameRaw.split("/").at(-1) + exportChunkDivider;
  }

  if (!manualChunks) return undefined;

  for (const [chunkName, moduleNames] of manualChunks) {
    for (const moduleName of moduleNames) {
      const nodeModulesName = `node_modules/${moduleName}`;
      if (id.includes(nodeModulesName)) return chunkName;
    }
  }

  if (manualChunksWorkspaces) {
    for (const [chunkName, moduleNames] of manualChunksWorkspaces.manualChunks) {
      for (const moduleName of moduleNames) {
        for (const workspaceModulePath of manualChunksWorkspaces.workspaces) {
          if (id.startsWith(`${workspaceModulePath}/${moduleName}`)) return chunkName;
        }
      }
    }
  }

  return undefined;
}
