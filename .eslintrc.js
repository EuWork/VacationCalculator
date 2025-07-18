const path = require("node:path");
const { createFolderStructure } = require("eslint-plugin-project-structure");

const commonEslint = require("@worksolutions/eslint-config-common")([
  path.resolve("./packages/kit/tsconfig.json"),
  path.resolve("./packages/dto/tsconfig.json"),
  path.resolve("./packages/frontend/tsconfig.json"),
  path.resolve("./packages/kit/tsconfig.json"),
  path.resolve("./packages/modules/tsconfig.json"),
  path.resolve("./packages/ui/tsconfig.json"),
]);

commonEslint.rules["react-hooks/exhaustive-deps"] = [
  "error",
  {
    additionalHooks: "(useAsyncFn|useEffectSkipFirst|useMemoizeCallback|useObservableAsDeferredMemo)",
  },
];
commonEslint.rules["no-async-promise-executor"] = "off";

const folderStructureConfig = createFolderStructure({
  projectRoot: "packages/frontend",
  structureRoot: "src",
  structure: [
    { name: "*" },
    {
      name: "api",
      children: [{ ruleId: "recursive_any_folder" }, { ruleId: "any_index_file" }],
    },
    {
      name: "components",
      children: [
        {
          name: "{PascalCase}",
          children: [{ ruleId: "any_index_file" }, { ruleId: "any_file" }, { ruleId: "recursive_any_folder" }],
        },
      ],
    },
    {
      name: "libs",
      children: [
        {
          name: "{kebab-case}",
          children: [{ ruleId: "any_index_file" }, { ruleId: "any_file" }, { ruleId: "recursive_any_folder" }],
        },
        { ruleId: "any_index_file" },
      ],
    },
    { name: "modules", children: [{ name: "{kebab-case}", ruleId: "module" }] },
    { name: "pages", children: [{ name: "{kebab-case}", ruleId: "module" }, { ruleId: "any_index_file" }] },
    { name: "theme", children: [{ ruleId: "any_file" }, { ruleId: "recursive_any_folder" }] },
    { name: "pages-common", children: [{ ruleId: "any_file" }, { ruleId: "recursive_any_folder" }] },
    { name: "router", children: [{ ruleId: "any_index_file" }, { ruleId: "recursive_any_folder" }] },
    {
      name: "translations",
      ruleId: "translations",
    },
  ],
  rules: {
    any_index_file: {
      name: "(index.ts)|(index.tsx)",
    },
    any_file: {
      name: "(*.ts)|(*.tsx)",
    },
    recursive_any_folder: {
      name: "*",
      children: [{ ruleId: "any_file" }, { ruleId: "recursive_any_folder" }],
    },
    translations: {
      children: [
        { name: "index.ts" },
        {
          name: "files",
          children: [
            {
              name: "{snake_case}",
              ruleId: "translations",
            },
            {
              name: "{snake_case}.json",
            },
          ],
        },
      ],
    },
    module: {
      children: [
        { ruleId: "any_index_file" },
        {
          name: "async",
          children: [
            { ruleId: "any_index_file" },
            {
              name: "view",
              children: [{ ruleId: "any_index_file" }, { ruleId: "any_file" }, { ruleId: "recursive_any_folder" }],
            },
            { name: "sub-modules", children: [{ name: "{kebab-case}", ruleId: "module" }] },
            {
              name: "entities",
              children: [
                { ruleId: "any_index_file" },
                { name: "{kebab-case}", children: [{ ruleId: "any_index_file" }, { ruleId: "recursive_any_folder" }] },
              ],
            },
            { name: "loader", children: [{ ruleId: "any_file" }, { ruleId: "recursive_any_folder" }] },
            { name: "module-subclasses", children: [{ ruleId: "any_file" }, { ruleId: "recursive_any_folder" }] },
          ],
        },
      ],
    },
  },
});

module.exports = {
  ...commonEslint,
  plugins: [...commonEslint.plugins, "eslint-plugin-project-structure"],
  overrides: [
    {
      files: ["packages/**/*.ts*"],
      rules: {
        "import/order": [
          "error",
          {
            "newlines-between": "always",
            distinctGroup: true,
            groups: [["builtin", "external"], "internal", ["parent", "sibling"], "index", "unknown"],
            pathGroupsExcludedImportTypes: ["builtin"],
            pathGroups: [
              {
                pattern: "react",
                group: "builtin",
              },
              {
                pattern: "react-dom/**",
                group: "builtin",
              },
              {
                pattern: "@app/**",
                group: "external",
              },
              {
                pattern: "@worksolutions/**",
                group: "external",
              },
              {
                pattern: "modules/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "libs/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "libs",
                group: "internal",
                position: "before",
              },
              {
                pattern: "{.,..}/**/*.css",
                group: "unknown",
                position: "after",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["**/*"],
      rules: {
        "project-structure/folder-structure": ["error", folderStructureConfig],
      },
    },
  ],
};
