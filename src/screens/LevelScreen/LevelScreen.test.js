// features/LevelScreen/LevelScreen.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LevelScreen from './LevelScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('2')),
  setItem: jest.fn(),
}));
// jest.mock('react-native-reanimated', () =>
//   require('react-native-reanimated/mock')
// );
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  addListener: jest.fn(() => () => {}),
};

describe('LevelScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title correctly', () => {
    const { getByText } = render(<LevelScreen navigation={mockNavigation} />);
    expect(getByText(/Select Your Level/i)).toBeTruthy();
  });

  it('displays multiple levels', async () => {
    const { getByText } = render(<LevelScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Level 1')).toBeTruthy();
      expect(getByText('Level 2')).toBeTruthy();
    });
  });

  it('navigates to Home screen on unlocked level press', async () => {
    const { getByText } = render(<LevelScreen navigation={mockNavigation} />);

    const level1 = await waitFor(() => getByText('Level 1'));
    fireEvent.press(level1);

    expect(mockNavigate).toHaveBeenCalledWith('Home', expect.any(Object));
  });

  it('does not navigate to locked level', async () => {
    const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { getByText } = render(<LevelScreen navigation={mockNavigation} />);

    const lockedLevel = await waitFor(() => getByText('Level 5'));
    fireEvent.press(lockedLevel);

    expect(mockNavigate).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
