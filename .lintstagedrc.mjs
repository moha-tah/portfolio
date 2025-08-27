/** @type {import('lint-staged').Configuration} */
export default {
  "apps/front/**/*.{ts,tsx}": (files) => [
    `pnpm lint:fix --filter=front -- --file ${files.join(" ")}`,
  ],
  "apps/back/**/*.{ts,js}": (files) => [
    `pnpm lint:fix --filter=back -- ${files.join(" ")}`,
  ],
  "packages/utils/**/*.{ts,tsx}": (files) => [
    `pnpm lint:fix --filter=utils --  ${files.join(" ")}`,
  ],
};
