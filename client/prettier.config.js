/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	singleQuote: true,
	trailingComma: 'all',
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrder: ['^node:(.*)$', '^@/(.*)$', '^[./]'],
};

export default config;
