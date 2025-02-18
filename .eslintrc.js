module.exports = {
    root: true,
    extends: [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: ["@typescript-eslint"],
    settings: {
        react: {
            version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    // Fine tune rules
    rules: {
        "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-namespace": 0,
        "react/prop-types": 0,
        "react/display-name": 0,
        "react/no-children-prop": 0,
        "prefer-const": 0,
    },
    // overrides: [
    //     {
    //         files: ["**/*.tsx"],
    //         rules: {
    //             "react/prop-types": "off"
    //         }
    //     }
    // ]
};
