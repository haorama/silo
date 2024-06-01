/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module",
  },
  ignorePatterns: ["dist", ".eslintrc.*"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    browser: true,
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  }
};

module.exports = config;
