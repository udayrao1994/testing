jest.mock('expo', () => ({
    ...jest.requireActual('expo'),
  }));
  jest.mock('expo-linear-gradient', () => {
    const React = require('react');
    return {
      LinearGradient: ({ children }) => React.createElement('LinearGradient', {}, children),
    };
  });
  
  jest.mock('@expo/vector-icons', () => {
    const React = require('react');
    return {
      Ionicons: () => React.createElement('Ionicons'),
    };
  });
    