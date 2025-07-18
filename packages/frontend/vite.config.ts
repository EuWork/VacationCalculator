import { createViteConfig } from "@app/builder";
import { DynamicPublicDirectory } from "vite-multiple-assets";
import * as path from "node:path";
import { config } from "dotenv";

const rootPath = path.join(process.cwd(), "..", "..");

config({ path: path.join(rootPath, ".env") });

const viteConfig = createViteConfig({
  server: { port: 3000 },
  externals: [],
  mode: "app",
  manualChunksWorkspaces: {
    workspaces: [path.join(rootPath, "packages")],
    manualChunks: [
      ["ui", ["ui"]],
      ["modules", ["modules"]],
      ["kit", ["kit"]],
      ["dto", ["dto"]],
    ],
  },
  manualChunks: [
    ["reflect", ["reflect-metadata"]],
    ["lodash", ["lodash", "lodash.debounce", "lodash.throttle"]],
    ["ws", ["@worksolutions", "@popperjs"]],
    ["date", ["luxon"]],
    ["network", ["axios", "@microsoft/signalr"]],
    ["lazy-image", ["react-lazy-load-image-component"]],
    ["react", ["react", "react-dom"]],
    ["router", ["react-router", "react-router-dom"]],
    ["data", ["mobx", "mobx-utils", "mobx-react-lite"]],
    ["class", ["class-validator", "class-transformer", "validator", "libphonenumber-js"]],
    ["ant", ["antd", "@ant-design", "rc-", "dayjs", "@rc-component"]],
    ["babel", ["@babel"]],
  ],
});

viteConfig.publicDir = false;
viteConfig.plugins.push(DynamicPublicDirectory(["public/**", path.join("..", "ui", "public/**")], {}));

Object.entries(process.env).forEach(([key, value]) => {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
    viteConfig.define[`process.env.${key}`] = JSON.stringify(value);
  }
});
export default viteConfig;
