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
            "newlines-between": "always"
        }]
    }
}
