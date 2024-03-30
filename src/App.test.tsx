import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { TaskProvider } from "./Context/TaskProvider";

describe("App Component", () => {
  const mockTasks = [
    { title: "Task 1", completed: false },
    { title: "Task 2", completed: true },
  ];

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("tasks", JSON.stringify(mockTasks));
  });

  it("loads tasks from session storage on initial render", () => {
    render(
      <TaskProvider>
        <App />
      </TaskProvider>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("adds a new task, clears the input, and updates the tasks list", async () => {
    render(
      <TaskProvider>
        <App />
      </TaskProvider>
    );
    const taskInput = screen.getByPlaceholderText(
      "Add Task"
    ) as HTMLInputElement;

    fireEvent.change(taskInput, { target: { value: "New Task" } });
    expect(taskInput.value).toBe("New Task"); // Verify input before adding

    const addButton = screen.getByTestId("add-test-button") as HTMLInputElement;
    fireEvent.click(addButton);

    expect(taskInput.value).toBe(""); // Verify input is cleared after adding

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("throws an error when useTask hook is not used within a TaskProvider", () => {
    expect(() => render(<App />)).toThrowError(
      "useTask must be used within a TaskProvider"
    );
  });
});
