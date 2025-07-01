const path = require('path');

module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-async-storage' +
      '|expo' +
      '|expo-linear-gradient' +
      '|expo-font' +
      '|expo-constants' +
      '|expo-modules-core' +
      '|react-native-animatable' +
      '|@expo/vector-icons' +
    ')/)',
  ],
  moduleNameMapper: {
    '@expo/vector-icons': '<rootDir>/__mocks__/@expo-vector-icons.js',
  },
};
