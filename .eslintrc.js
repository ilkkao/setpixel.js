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
    'no-plusplus': 'off'
  },
  plugins: [
    'prettier'
  ]
};
