module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'examples'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
  },
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
