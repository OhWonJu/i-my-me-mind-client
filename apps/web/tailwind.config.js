const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

const baseConfig = require("../../tailwind.base.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../libs/core/src/**/*.{js,ts,jsx,tsx}",
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  ...baseConfig,
};
