export default {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:solid/typescript',
    'plugin:cypress/recommended',
  ],
  plugins: ['@typescript-eslint', 'solid', 'cypress'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/*.md'],
  rules: {
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'solid/no-innerhtml': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
