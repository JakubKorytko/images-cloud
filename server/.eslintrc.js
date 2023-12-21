module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "sort-imports":
        [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true
            }
        ],
        "import/order": [ "error", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
            pathGroups: [
                {
                    pattern: "routes/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "controllers/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "middlewares/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "models/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "upload/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "utils/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "testModels/**",
                    group: "internal",
                    position: "after"
                }
            ],
            "newlines-between": "always",
            pathGroupsExcludedImportTypes: ["type"]
        }]
    }
}
