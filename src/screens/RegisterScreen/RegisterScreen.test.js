import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from './RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
};

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows alert if fields are empty', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('SIGN UP'));
    expect(alertSpy).toHaveBeenCalledWith('Message', 'Please fill all fields.');
  });

  it('shows alert if passwords do not match', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '654321');
    fireEvent.press(getByText('SIGN UP'));
    expect(alertSpy).toHaveBeenCalledWith('Message', 'Passwords do not match!');
  });

  it('stores user data and navigates on successful registration', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '123456');
    fireEvent.press(getByText('SIGN UP'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Message', 'Registration successful!');
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });

  it('shows alert on AsyncStorage error', async () => {
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('fail'));
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('Email Address'), 'jane@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password');
    fireEvent.press(getByText('SIGN UP'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Message', 'Failed to save user data.');
    });
  });

  it('navigates to login screen when link is pressed', () => {
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Login'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
