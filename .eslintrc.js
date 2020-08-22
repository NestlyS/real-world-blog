module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint-config-prettier",
    "prettier/react",
  ],
  plugins: ["react"],
  parser: "babel-eslint",
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    curly: ["error"],
    "max-depth": ["warn", 4],
    "id-length": ["warn", { exceptions: ["i", "j"], min: 2 }],
    "no-lonely-if": ["error"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-restricted-syntax": "off",
    "class-methods-use-this": "off",
    "jsx-a11y/href-no-hash": ["off"],
    "jsx-a11y/anchor-is-valid": ["off"],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "either",
      },
    ],
    "react/state-in-constructor": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/static-property-placement": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/no-unused-prop-types": ["off"],
    "react-hooks/exhaustive-deps": ["off"],
    "import/no-named-as-default": 0,
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
