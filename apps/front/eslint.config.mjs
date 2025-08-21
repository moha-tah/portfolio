import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

/** @type {import("eslint").Linter.Config} */
const eslintConfig = [
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
      'turbo',
      'next',
      'next/core-web-vitals',
      'next/typescript'
    ],
    plugins: ['@typescript-eslint', 'import', 'unused-imports'],
    parser: '@typescript-eslint/parser',
    ignorePatterns: [
      '.turbo/',
      'node_modules/',
      '.next/',
      'messages/*.d.json.ts'
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
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
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/i18n/navigation` instead.'
        },
        {
          name: 'next/navigation',
          importNames: ['redirect', 'usePathname', 'useRouter', 'getPathname'],
          message: 'Please import from `@/i18n/navigation` instead.'
        }
      ]
    }
  })
]

export default eslintConfig
