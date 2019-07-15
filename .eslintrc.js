module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
    'standard',
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'prettier/@typescript-eslint',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:jest/recommended'
	],
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': "off"
	}
}
