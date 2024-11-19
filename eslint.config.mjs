import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // JavaScript Configuration
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" },
    rules: {
      "no-unused-vars": "off", // Warn about unused variables
      "semi": ["error", "always"], // Enforce semicolons
      "quotes": ["error", "double"], // Enforce double quotes
      "eqeqeq": "error", // Require === and !==
      "no-console": "warn", // Warn about console.log statements
      "no-var": "error", // Enforce let/const instead of var
      "prefer-const": "error", // Suggest using const wherever possible
      "curly": "error", // Require curly braces for all control statements
      "arrow-spacing": ["error", { before: true, after: true }], // Enforce spacing around arrow functions
    },
  },
];
