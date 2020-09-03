module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "prettier", "jest"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-expressions": "off",
    "react/jsx-props-no-spreading": "off",
    "react/forbid-prop-types": "off",
    "no-named-as-default": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "no-param-reassign": "off",
  },
};
