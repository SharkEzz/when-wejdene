// @ts-check

import eslintjs from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  eslintjs.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    linterOptions: { reportUnusedDisableDirectives: 'error', reportUnusedInlineConfigs: 'error' },
    rules: {
      'no-console': 'warn',
      'require-atomic-updates': 'warn',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unnecessary-type-conversion': 'error',
      '@typescript-eslint/no-unnecessary-type-parameters': 'error',
      '@typescript-eslint/no-unsafe-type-assertion': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.es2025,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { files: ['**/*.js'], extends: [tseslint.configs.disableTypeChecked] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      react.configs.flat['recommended'] ?? {},
      react.configs.flat['jsx-runtime'] ?? {},
      reactHooks.configs.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      'react-hooks/react-compiler': 'error',
    },
    settings: {
      react: {
        version: '19.1',
      },
    },
  },
);
