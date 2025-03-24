import js from "@eslint/js";
import preferArrow from "eslint-plugin-prefer-arrow";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "src/routeTree.gen.ts", "public"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "prefer-arrow": preferArrow,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prefer-arrow/prefer-arrow-functions": ["warn"],
    },
  },
  // *.stories.tsx ファイル用の個別の設定
  {
    files: ["**/*.stories.tsx"],
    rules: {
      // storybookではreact-hooks/rules-of-hooksをoffにする
      "react-hooks/rules-of-hooks": "off",
    },
  },
  // コンポーネントファイル用の個別の設定
  {
    files: ["**/components/**/*.{ts,tsx}"],
    rules: {
      // コンポーネントでは関数宣言を許可(shadcn/uiを使っているため)
      "prefer-arrow/prefer-arrow-functions": "off",
    },
  }
);
