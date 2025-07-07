// features/LeaderboardScreen/LeaderboardScreen.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LeaderboardScreen from './LeaderboardScreen';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock react-native-animatable
jest.mock('react-native-animatable', () => {
  return {
    View: ({ children }) => children,
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  return {
    LinearGradient: ({ children, ...props }) => <>{children}</>,
  };
});

describe('LeaderboardScreen', () => {
  it('renders header text', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([
        { level: 1, score: 5, total: 10 },
        { level: 2, score: 7, total: 10 },
      ])
    );

    const { getByText } = render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(getByText('🏆 Leaderboard')).toBeTruthy();
    });
  });

  it('displays correct scores per level', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([
        { level: 1, score: 5, total: 10 },
        { level: 2, score: 8, total: 10 },
        { level: 1, score: 6, total: 10 }, // higher score should be shown
      ])
    );

    const { getByText } = render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(getByText('Level 1')).toBeTruthy();
      expect(getByText('Score: 6 / 10')).toBeTruthy(); // should show highest score
      expect(getByText('Level 2')).toBeTruthy();
      expect(getByText('Score: 8 / 10')).toBeTruthy();
    });
  });

  it('renders nothing if no scores are present', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const { queryByText } = render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(queryByText(/Level/)).toBeNull();
    });
  });
});