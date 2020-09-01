module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
        "prettier/react",
        "plugin:jest/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "prettier",
        "jest"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
};
