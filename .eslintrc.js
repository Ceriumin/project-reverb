module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-native'],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
