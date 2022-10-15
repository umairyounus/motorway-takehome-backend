module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb-base', 'airbnb-typescript/base', 'prettier'],
  env: {
    node: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-new': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', 'packages/**/tests/**/*.ts'],
      },
    ],
  },
};
