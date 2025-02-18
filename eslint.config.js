import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    extends: [...tseslint.configs.recommended],
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    plugins: { '@stylistic': stylistic },
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
      '@stylistic/curly-newline': ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    },
  }
);
