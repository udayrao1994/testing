import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";

const mockRoute = {
  params: {
    level: 1,
    questions: [
      { question: "2 + 2" },
      { question: "3 + 5" },
    ],
  },
};

describe("HomeScreen", () => {
  it("renders the current question", () => {
    const { getByText } = render(<HomeScreen route={mockRoute} />);
    expect(getByText("2 + 2")).toBeTruthy();
  });

  it("shows timer and progress", () => {
    const { getByText } = render(<HomeScreen route={mockRoute} />);
    expect(getByText("Level : 1")).toBeTruthy();
    expect(getByText("1/2")).toBeTruthy();
  });
});
