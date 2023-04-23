module.exports = {
  "extends": "next/core-web-vitals",
  "rules": {
    "react-hooks/exhaustive-deps": "off",
    "semi": ["warn", "always"],
    "no-multi-spaces": "error",
    "eol-last": ["error", "always"],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 0
    }],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ["error", "never"]
  }
}