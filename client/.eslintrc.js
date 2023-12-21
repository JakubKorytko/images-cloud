module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    rules: {
        "no-param-reassign": ["error", {
            props: true,
            ignorePropertyModificationsFor: [
            "state"
            ]
        }],
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
                    pattern: "**/*.scss",
                    group: "type",
                    position: "after"
                },
                {
                    pattern: "utils/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "app/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "components/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "flickity/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "routes/**",
                    group: "internal",
                    position: "after"
                },
                {
                    pattern: "features/**",
                    group: "internal",
                    position: "after"
                }
            ],
            pathGroupsExcludedImportTypes: ["type"],
            "newlines-between": "always"
        }]
    }
}
