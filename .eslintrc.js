module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', 'd.ts'],
      },
    },
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-unused-vars': 'off',
    'import/extensions': 'off',

    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'off',
  },
};
