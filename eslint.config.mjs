import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Linter } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {Linter.Config<Linter.RulesRecord>} */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@next/next/no-img-element": "off"
    }
  }
];

export default eslintConfig;
