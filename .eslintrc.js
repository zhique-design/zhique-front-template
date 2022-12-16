module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'prettier',
    'simple-import-sort',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    '@typescript-eslint/no-var-requires': [0],
    'react/function-component-definition': [0],
    'react/jsx-props-no-spreading': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'react/require-default-props': [0],
    'react/no-array-index-key': [0],
    '@typescript-eslint/ban-ts-comment': [0],
    'no-undef': [0],
    'no-unused-vars': [0],
    'sort-imports': [0],
    'import/order': [0],
    'simple-import-sort/imports': [2],
    'simple-import-sort/exports': [2],
    'prettier/prettier': [
      2,
      {
        singleQuote: true,
      },
    ],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
  },
};
