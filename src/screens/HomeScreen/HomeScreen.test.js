import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

const mockRoute = {
  params: {
    questions: [
      { question: "1 + 1", answer: "2" },
      { question: "2 + 2", answer: "4" },
    ],
    level: 1,
  },
};

const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };

describe("HomeScreen", () => {
  it("submits correct answer and renders next question", async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <HomeScreen route={mockRoute} navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Tap '2' on keypad
    fireEvent.press(getByText("2"));

    // Confirm input is updated
    expect(getByTestId("answer-display").props.children).toBe("2");

    // Tap Save/Submit button
    fireEvent.press(getByText("Save"));

    // Wait for next question to appear
    await waitFor(() => {
      expect(getByText("2 + 2")).toBeTruthy();
    });
  });
});
