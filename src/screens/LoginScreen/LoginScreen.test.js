import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      replace: jest.fn(),
      navigate: jest.fn(),
    }),
  };
});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows alert if email or password is empty', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('LOGIN'));
    expect(alertSpy).toHaveBeenCalledWith('Message', 'Please enter both email and password');
  });

  it('shows alert if user not found in AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('LOGIN'));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Message', 'No user found. Please register first.');
    });
  });

  it('shows alert on invalid email/password', async () => {
    AsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({ email: 'user@example.com', password: 'pass123' })
    );
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'wrong@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpass');
    fireEvent.press(getByText('LOGIN'));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Message', 'Invalid email or password');
    });
  });

  it('navigates to Levels screen on valid credentials', async () => {
    AsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({ email: 'user@example.com', password: 'pass123' })
    );
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'pass123');
    fireEvent.press(getByText('LOGIN'));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Message', 'Login successful!');
    });
  });

  it('navigates to Register screen when link is pressed', () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('Register'));
  });
});
