import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

/** @type {import("eslint").Linter.Config} */
export default [
  ...compat.config(
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'turbo'
      ],
      plugins: ['@typescript-eslint', 'import', 'unused-imports'],
      parser: '@typescript-eslint/parser',

      ignorePatterns: ['.turbo/', 'dist/', 'node_modules/'],

      rules: {
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ],
        'import/no-duplicates': 'warn',
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'internal'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true }
          }
        ],
        'sort-imports': [
          'warn',
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple']
          }
        ]
      }
    },
    {
      ignores: ['*.config.mjs']
    },
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          sourceType: 'module'
        }
      }
    }
  )
]
