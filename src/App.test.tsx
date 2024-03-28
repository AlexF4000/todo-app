import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import { Task } from "./Task"; // Assuming this is where your Task type is defined

// Define a mock storage object
const mockSessionStorage: Storage = {
  length: 0,
  clear: jest.fn(),
  getItem: jest.fn((key: string) => null),
  key: jest.fn((index: number) => null),
  removeItem: jest.fn(),
  setItem: jest.fn(),
};

// Type assertion to satisfy TypeScript's type checking
Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

test("renders", () => {
  render(<App />);
  const linkElement = screen.getByText(/TODO LIST/i);
  expect(linkElement).toBeInTheDocument();
});

test("adds a new task", () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText("Add Task");
  const addButton = getByText("Add");

  // Simulate typing a new task and adding it
  fireEvent.change(inputElement, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  // Check if the new task is displayed
  expect(getByText("New Task")).toBeInTheDocument();
});

test("toggles a task's completion status", () => {
  // Prepopulate session storage with a task
  (mockSessionStorage.getItem as jest.Mock).mockImplementationOnce(() =>
    JSON.stringify([{ title: "New Task", completed: false }])
  );

  const { getByLabelText } = render(<App />);
  const checkbox = getByLabelText("New Task") as HTMLInputElement;

  fireEvent.click(checkbox);

  // Check if the checkbox is checked
  expect(checkbox.checked).toBe(true);
});

test("deletes a task", () => {
  const { getByText, queryByText } = render(<App />);
  // Assuming a task "New Task" exists

  // Simulate deleting the task
  fireEvent.click(getByText("Delete"));

  // Check if the task is no longer displayed
  expect(queryByText("New Task")).not.toBeInTheDocument();
});
