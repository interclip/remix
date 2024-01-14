/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
        project: ["./tsconfig.json", "./tsconfig.node.json"],
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },

    // Base config
    extends: ["eslint:recommended"],

    overrides: [
        // React
        {
            files: ["**/*.{js,jsx,ts,tsx}"],
            plugins: ["react", "jsx-a11y"],
            extends: [
                "eslint:recommended",
                "plugin:react/recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:react/jsx-runtime",
                "plugin:@typescript-eslint/recommended-type-checked",
                "plugin:react-hooks/recommended",
                "plugin:@typescript-eslint/stylistic-type-checked",
            ],
            rules: {
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/consistent-type-definitions": ["error", "type"],
                "react/prop-types": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/prefer-nullish-coalescing": "off",
                "@typescript-eslint/consistent-type-imports": [
                    "warn",
                    {
                        prefer: "type-imports",
                        fixStyle: "inline-type-imports",
                    },
                ],
                "react/self-closing-comp": [
                    "error",
                    {
                        component: true,
                        html: true,
                    },
                ],
                "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            },
            settings: {
                react: {
                    version: "detect",
                },
                formComponents: ["Form"],
                linkComponents: [
                    { name: "Link", linkAttribute: "to" },
                    { name: "NavLink", linkAttribute: "to" },
                ],
                "import/resolver": {
                    typescript: {},
                },
            },
        },

        // Typescript
        {
            files: ["**/*.{ts,tsx}"],
            plugins: ["@typescript-eslint", "import"],
            parser: "@typescript-eslint/parser",
            settings: {
                "import/internal-regex": "^~/",
                "import/resolver": {
                    node: {
                        extensions: [".ts", ".tsx"],
                    },
                    typescript: {
                        alwaysTryTypes: true,
                    },
                },
            },
            extends: ["plugin:@typescript-eslint/recommended", "plugin:import/recommended", "plugin:import/typescript"],
        },

        // Node
        {
            files: [".eslintrc.js"],
            env: {
                node: true,
            },
        },
    ],
};
