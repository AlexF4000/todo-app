import React, { createContext, useContext, ReactNode, useState } from "react";

// Define the shape of context state
type TaskContextType = {
  task: "light" | "dark";
  toggleTask: () => void;
};

// Initialize the context with a default value
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create a provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [task, setTasks] = useState<"light" | "dark">("light");

  const toggleTask = () => {
    setTasks((prevTasks) => (prevTasks === "light" ? "dark" : "light"));
  };

  return (
    <TaskContext.Provider value={{ task, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Create a custom hook to use the theme context
export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export {};
