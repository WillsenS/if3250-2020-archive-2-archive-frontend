module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-console": "off",
    "react/prop-types": 0,
    "no-useless-escape": "off",
    "no-async-promise-executor": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
  },
};
