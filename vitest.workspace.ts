import { defineWorkspace } from "vitest/config";

// const dirname =
//   typeof __dirname !== "undefined"
//     ? __dirname
//     : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  "vite.config.ts",
  {
    extends: "vite.config.ts",
    test: {
      name: "unit",
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      environment: "node",
    },
  },
  // TODO: storybookTestを有効にする
  // {
  //   extends: "vite.config.ts",
  //   plugins: [
  //     // The plugin will run tests for the stories defined in your Storybook config
  //     // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
  //     storybookTest({ configDir: path.join(dirname, ".storybook") }),
  //   ],
  //   test: {
  //     name: "storybook",
  //     include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  //     environment: "happy-dom",
  //   },
  // },
]);
