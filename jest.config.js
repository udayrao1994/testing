// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|react-native|@react-native|expo-modules-core|@react-navigation|expo-linear-gradient|react-native-animatable|@react-native-async-storage)/)',
  ],
};
