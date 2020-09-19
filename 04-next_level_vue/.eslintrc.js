module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/script-indent": [
      "warn",
      2,
      {
        baseIndent: 1,
      },
    ],
    "vue/html-indent": [
      "warn",
      2,
      {
        baseIndent: 1,
      },
    ],
    "no-extra-semi": "off",
    "prettier/prettier": [
      "warn",
      {
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        eslintIntegration: true,
        vueIndentScriptAndStyle: true,
        trailingComma: "all",
        arrowParens: "always",
      },
    ],
    "arrow-parens": [2, "always"],
  },
};
