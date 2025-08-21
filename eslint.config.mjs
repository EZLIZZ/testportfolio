import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // ⬇️ GLOBAL IGNORES (must be first)
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "src/prisma-client/**",     // <-- your generated Prisma client
      "**/.vercel/**",
      "**/dist/**",
      "**/build/**",
    ],
  },

  // Next.js presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // (Optional) safety net: if the folder ever gets included, silence the rules
  {
    files: ["src/prisma-client/**"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
