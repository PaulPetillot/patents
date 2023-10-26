/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["sznm/react", "plugin:react/jsx-runtime"],
  rules: {
    "import/prefer-default-export": 0,
    "semi": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/webpack.*.js"
        ]
      }]
  }
};
