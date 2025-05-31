import eslintjs from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.github', '.vscode', 'dist', 'helm', 'node_modules', 'public'],
  },
  eslintjs.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    linterOptions: { reportUnusedDisableDirectives: 'error', reportUnusedInlineConfigs: 'error' },
    rules: {
      'no-console': 'warn',
      'require-atomic-updates': 'warn',
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parserOptions: {
        projectService: {
          defaultProject: 'tsconfig.eslint.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.tsx'],
    extends: [reactRefresh.configs.vite],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      react.configs.flat['recommended'] ?? {},
      react.configs.flat['jsx-runtime'] ?? {},
      reactHooks.configs.recommended,
    ],
    rules: {
      'react-hooks/react-compiler': 'error',
    },
    settings: {
      react: {
        version: '19.1.0',
      },
    },
  },
);
