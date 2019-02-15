module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true,
    node: false
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-use-before-define': ['error', { variables: false }],
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': ['error']
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier', 'prettier/react']
};
