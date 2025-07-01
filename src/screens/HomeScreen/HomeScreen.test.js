import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const mockRoute = {
  params: {
    level: 1,
    questions: [
      { question: '2 + 2', answer: '4' },
      { question: '3 + 5', answer: '8' },
    ],
  },
};

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <HomeScreen route={mockRoute} />
    </NavigationContainer>
  );
};

describe('HomeScreen', () => {
  it('renders the current question', async () => {
    const { getByText } = renderWithNavigation();

    expect(getByText('2 + 2')).toBeTruthy();
  });

  it('allows user to submit correct answer', async () => {

    await act(async () => {  const { getByPlaceholderText, getByText } = renderWithNavigation();

    fireEvent.changeText(getByPlaceholderText('Enter your answer'), '4');
    fireEvent.press(getByText('Submit'));

    // Should render next question
    expect(getByText('3 + 5')).toBeTruthy();
  })
    });
});
