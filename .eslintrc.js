module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-console': 'warn',
    'eqeqeq': ['error', 'always'],
    'no-param-reassign': 'error',
    'react/prop-types': 'off', // Using PropTypes manually
  },
};
