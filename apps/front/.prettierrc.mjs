/** @type {import("prettier").Config} */
export default {
  trailingComma: 'none',
  endOfLine: 'auto',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cva']
}
