import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import LevelScreen from "./LevelScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ❌ REMOVE this if navigation is passed via props
// jest.mock("@react-navigation/native", () => ({
//   useNavigation: jest.fn(),
// }));

// ✅ Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("LevelScreen", () => {
  const mockNavigate = jest.fn();
  const mockReset = jest.fn();
  const mockSetOptions = jest.fn();
  const mockGoBack = jest.fn();

  const mockUnsubscribe = jest.fn();
  const mockAddListener = jest.fn((event, callback) => {
    if (event === "focus") {
      callback(); // Simulate screen focus
    }
    return mockUnsubscribe;
  });

  const mockNavigation = {
    navigate: mockNavigate,
    addListener: mockAddListener,
    reset: mockReset,
    setOptions: mockSetOptions,
    goBack: mockGoBack,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  it("renders level list", async () => {
    render(<LevelScreen route={{ params: {} }} navigation={mockNavigation} />);

    expect(await screen.findByText("Level 1", {}, { timeout: 10000 })).toBeTruthy();
    expect(mockAddListener).toHaveBeenCalledWith("focus", expect.any(Function));
  });

  it("navigates to QuizScreen with correct level when a level is pressed", async () => {
    render(<LevelScreen route={{ params: {} }} navigation={mockNavigation} />);

    const level1Button = await screen.findByText("Level 1");
    fireEvent.press(level1Button);

    expect(mockNavigate).toHaveBeenCalledWith("Home", {
         level: 1,
         questions: [
           { question: "1 + 1", answer: "2" },
           { question: "2 + 2", answer: "4" },
           { question: "3 - 1", answer: "2" },
           { question: "4 + 0", answer: "4" },
           { question: "5 - 2", answer: "3" },
         ],
      });
  });

  it("loads unlocked level from AsyncStorage", async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(3));

    render(<LevelScreen route={{ params: {} }} navigation={mockNavigation} />);

    expect(await screen.findByText("Level 3")).toBeTruthy();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("unlockedLevel");
  });
});
