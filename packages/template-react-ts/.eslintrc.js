module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'import',
  ],
  'ignorePatterns': [
    'dist/**/*',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }],
    'brace-style': ['error', '1tbs'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': true,
    }],
    'max-len': ['error', {
      'code': 120,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreRegExpLiterals': true,
    }],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': ['error', {
      'ignoreComments': true,
    }],
    'curly': ['error', 'all'],
    'react/no-array-index-key': ['error'],
    'react/jsx-props-no-multi-spaces': ['error'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'prefer-destructuring': ['error'],
    'import-order/import-order': ['error'],
  },
};
