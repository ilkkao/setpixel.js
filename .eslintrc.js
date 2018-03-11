module.exports = {
  extends: [
    'airbnb-base',
    'prettier'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  env: {
      browser: true
  },
  rules: {
    'prettier/prettier': [
      'error', {
        singleQuote: true
      }
    ],
    'no-bitwise': 'off',
    'no-plusplus': 'off',
    'import/no-unresolved': 'off', // TODO: fix and remove
    'import/extensions': 'off' // TODO: fix and remove
  },
  plugins: [
    'prettier'
  ]
};
