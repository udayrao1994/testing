import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; // Update this path as per your structure
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';

// ✅ Mock AsyncStorage if used
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// ✅ Mock vector icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }) => React.createElement(Text, null, name),
  };
});

// ✅ Helper to wrap screen with NavigationContainer
const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
};

describe('HomeScreen', () => {
  it('renders the question and allows correct answer submission', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation();

    // wait for the input field to appear
    const input = await waitFor(() => getByPlaceholderText('Enter your answer'));

    // ✅ Type the answer
    await act(async () => {
      fireEvent.changeText(input, '4');
      fireEvent.press(getByText('Submit')); // Update to 'Save' if that’s your actual button
    });

    // ✅ Add some expectation if needed
    await waitFor(() => {
      expect(getByText(/Level/i)).toBeTruthy(); // or success message
    });
  });

  it('renders all number keys', async () => {
    const { getByText } = renderWithNavigation();

    await waitFor(() => {
      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('3')).toBeTruthy();
      expect(getByText('4')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
      expect(getByText('6')).toBeTruthy();
      expect(getByText('7')).toBeTruthy();
      expect(getByText('8')).toBeTruthy();
      expect(getByText('9')).toBeTruthy();
      expect(getByText('0')).toBeTruthy();
    });
  });
});
