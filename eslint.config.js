import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import jestDom from 'eslint-plugin-jest-dom';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      '@stylistic': stylistic,
      vitest,
    },
    extends: [
      ...tseslint.configs.recommended,
      vitest.configs.recommended,
      jestDom.configs['flat/recommended'],
    ],
    rules: {
      curly: ['error', 'all'],
      quotes: ['error', 'single'],
      eqeqeq: ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          generics: 'ignore',
        },
      ],
      '@stylistic/max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
          ignoreComments: false,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    },
  }
);
