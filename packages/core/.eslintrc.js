/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ["custom"],
  ignorePatterns: ["dist", ".eslintrc.*"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  }
};
