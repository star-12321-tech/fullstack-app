// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-essential', // or 'plugin:vue/essential' if using Vue 2
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Disable the multi-word component name rule
    'vue/multi-word-component-names': 'off',
  },
};