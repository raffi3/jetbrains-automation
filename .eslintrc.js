module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "semi": [2, "always"],
        "no-unreachable": "error",
        "eqeqeq": ["error", "always"],
        "no-else-return": "warn",
        "prefer-const": "warn",
        "max-len": ["warn", { "code": 135, "ignoreComments": true, "ignoreUrls": true }],
    }
};
