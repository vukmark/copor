// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const StylisticPlugin = require('@stylistic/eslint-plugin');
const jest = require('eslint-plugin-jest');

module.exports = tseslint.config(eslint.configs.recommended, ... tseslint.configs.recommendedTypeChecked, ... tseslint.configs.stylisticTypeChecked, {
	'languageOptions': {
		'parser': tseslint.parser,
		'parserOptions': {
			'project': true
		}
	},
	'plugins': {
		'stylistic': StylisticPlugin,
		'jest': jest,
		'typescript-eslint': tseslint
	},
	'rules': {
		... jest.configs['flat/recommended'].rules,
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'jest/unbound-method': 'error',
		'stylistic/quotes': ['error', 'single'],
		'stylistic/semi': ['error', 'always'],
		'stylistic/comma-dangle': ['error', 'never'],
		'stylistic/newline-per-chained-call': ['error', {'ignoreChainWithDepth': 4}],
		'stylistic/no-confusing-arrow': ['error', {'allowParens': true}],
		'stylistic/no-extra-parens': ['error', 'all'],
		'stylistic/no-extra-semi': 'error',
		'stylistic/no-floating-decimal': 'error',
		'stylistic/no-mixed-operators': 'error',
		'stylistic/no-mixed-spaces-and-tabs': 'error',
		'stylistic/no-multi-spaces': 'error',
		'stylistic/no-multiple-empty-lines': 'error',
		'stylistic/no-tabs': ['error', {'allowIndentationTabs': true}],
		'stylistic/no-trailing-spaces': 'error',
		'stylistic/no-whitespace-before-property': 'error',
		'stylistic/nonblock-statement-body-position': ['error', 'below'],
		'stylistic/object-curly-newline': ['error', {'consistent': true}],
		'stylistic/object-curly-spacing': ['error', 'never'],
		'stylistic/object-property-newline': 'off',
		'stylistic/one-var-declaration-per-line': ['error', 'initializations'],
		'stylistic/operator-linebreak': ['error', 'before'],
		'stylistic/padded-blocks': ['error', 'never'],
		'stylistic/padding-line-between-statements': [
			'error',
			{
				'blankLine': 'always',
				'prev': ['const', 'let', 'var'],
				'next': '*'
			},
			{
				'blankLine': 'any',
				'prev': ['const', 'let', 'var'],
				'next': ['const', 'let', 'var']
			}
		],
		'stylistic/quote-props': ['error', 'consistent'],
		'stylistic/rest-spread-spacing': ['error', 'always'],
		'stylistic/semi-spacing': ['error', {'before': false}],
		'stylistic/semi-style': ['error', 'last'],
		'stylistic/space-before-blocks': 'error',
		'stylistic/space-in-parens': ['error', 'never'],
		'stylistic/space-infix-ops': 'error',
		'stylistic/space-unary-ops': 'error',
		'stylistic/switch-colon-spacing': ['error', {
			'before': true,
			'after': true
		}],
		'stylistic/template-curly-spacing': ['error', 'never'],
		'stylistic/array-bracket-newline': ['error', 'consistent'],
		'stylistic/array-bracket-spacing': ['error', 'never'],
		'stylistic/array-element-newline': ['error', 'consistent'],
		'stylistic/arrow-parens': ['error', 'always'],
		'stylistic/arrow-spacing': ['error', {
			'before': true,
			'after': true
		}],
		'stylistic/block-spacing': 'off',
		'stylistic/brace-style': 'error',
		'stylistic/comma-spacing': ['error', {
			'before': false,
			'after': true
		}],
		'stylistic/comma-style': ['error', 'last'],
		'stylistic/computed-property-spacing': ['error', 'never'],
		'stylistic/function-call-argument-newline': ['error', 'consistent'],
		'stylistic/function-call-spacing': ['error', 'never'],
		'stylistic/function-paren-newline': 'off',
		'stylistic/implicit-arrow-linebreak': ['error', 'beside'],
		'stylistic/indent': ['error', 'tab'],
		'stylistic/key-spacing': ['error', {
			'beforeColon': false,
			'afterColon': true
		}],
		'stylistic/keyword-spacing': ['error', {
			'before': true,
			'after': true
		}],
		'stylistic/max-len': ['error', {'code': 140}],
		'stylistic/max-statements-per-line': ['error', {'max': 1}],
		'stylistic/multiline-ternary': ['off'],
		'stylistic/new-parens': ['error', 'always'],
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/naming-convention': ['error',
			{
				selector: 'default',
				format: ['camelCase']
			},
			{
				selector: 'import',
				format: ['camelCase', 'PascalCase']
			},
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE']
			},
			{
				selector: 'typeLike',
				format: ['PascalCase']
			},
			{
				selector: 'class',
				format: ['PascalCase']
			},
			{
				selector: 'classMethod',
				format: ['camelCase']
			},
			{
				selector: 'enum',
				format: ['PascalCase']
			},
			{
				selector: 'enumMember',
				format: ['camelCase', 'UPPER_CASE']
			}],
		'@typescript-eslint/parameter-properties': 'error',
		'no-case-declarations': 'off'
	}
},
// Disabled naming-convention for all migration files
{
	'files': ['**/migrations/**/*.ts'],
	'rules': {
		'@typescript-eslint/naming-convention': 'off'
	}
}
);


