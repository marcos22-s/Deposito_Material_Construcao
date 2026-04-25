import js from "@eslint/js";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// Definindo compatibilidade para plugins que ainda não migraram 100%
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default [
  // 1. Ignorar pastas de build
  { ignores: ["build", "dist", "node_modules"] },

  // 2. Regras básicas do JS
  js.configs.recommended,

  // 3. Importando as regras do React e Hooks via modo de compatibilidade (Mais seguro para CRA)
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),

  // 4. Configurações manuais e Prettier
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
      "no-undef": 0
    }
  }
];
