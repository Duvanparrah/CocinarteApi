import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly"
      }
    },
    rules: {},
    extends: [
      "eslint:recommended",
      "eslint-config-prettier" // Desactiva reglas que chocan con Prettier
    ]
  }
]);
