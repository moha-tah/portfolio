/** @type {import('lint-staged').Configuration} */
export default {
  "apps/front/**/*.{ts,tsx}": (files) => [
    `pnpm lint:fix --filter=front -- --file ${files.join(" ")}`,
  ],
};
