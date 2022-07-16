module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'operator-linebreak': 'off',
    'object-curly-spacing': 'off',
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', {
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true
    }]
  }
}
