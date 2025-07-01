import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LevelScreen from './LevelScreen';
import QuizData from '../../data/QuizData';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }) => <Text>{name}</Text>,
  };
});



jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('2')), // Mock unlocked level
  setItem: jest.fn(),
}));

// // Suppress native driver warnings
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');



// Mock react-native-animatable
jest.mock('react-native-animatable', () => {
  const View = ({ children }) => children;
  const Text = ({ children }) => children;
  return {
    View,
    Text,
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  return {
    LinearGradient: ({ children }) => children,
  };
});

// Mock Dimensions
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Dimensions = {
    get: () => ({ width: 400, height: 800 }),
    addEventListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  };
  return RN;
});

// Create mock navigation
const createTestProps = () => ({
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn((event, callback) => {
      if (event === 'focus') callback();
      return jest.fn(); // unsubscribe
    }),
  },
});

describe('LevelScreen', () => {
  it('renders unlocked level cards with gradient', async () => {
    const props = createTestProps();

    const { findByText } = render(<LevelScreen {...props} />);

    // Check for title
    expect(await findByText('🎯 Select Your Level')).toBeTruthy();

    // Level 1 and 2 should be unlocked
    const level1 = await findByText('Level 1');
    const level2 = await findByText('Level 2');

    expect(level1).toBeTruthy();
    expect(level2).toBeTruthy();

    // Locked level
    const locked = await findByText('lock-closed');
    expect(locked).toBeTruthy();
  });

  it('navigates when unlocked level is pressed', async () => {
    const props = createTestProps();
    const { findByText } = render(<LevelScreen {...props} />);

    const level1 = await findByText('Level 1');
    fireEvent.press(level1);

    expect(props.navigation.navigate).toHaveBeenCalledWith('Home', {
      questions: QuizData[0].questions,
      level: 1,
    });
  });
});
