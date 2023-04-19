module.exports = {
  "extends": "next/core-web-vitals",
  "rules": {
    "react-hooks/exhaustive-deps": "off",
    "semi": ["error", "always"],
    "no-multi-spaces": "error",
    "eol-last": ["error", "always"],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 0
    }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'comma-dangle': ["error", "never"]
  }
}