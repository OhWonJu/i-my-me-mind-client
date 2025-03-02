import nx from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig,
  ...nx.configs["flat/react"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {
      "@typescript-eslint/no-empty-interface": "off",
      "react/jsx-no-useless-fragment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
];
