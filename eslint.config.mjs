import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Your overrides
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "src/prisma-client/**",   // 👈 ignore Prisma generated files
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off", // allow require in generated code
      "@typescript-eslint/no-empty-object-type": "off", // Prisma sometimes generates {}
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
