import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Task } from "../Task";

// Define the shape of context state
type TaskContextType = {
  addTask: () => void;
  toggleTask: (index: number) => void;
  deleteTask: (index: number) => void;
  tasks: Task[];
  title: string;
  setTitle: (title: string) => void;
};

// Initialize the context with a default value
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create a provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");

  // Load tasks from session storage when the component mounts
  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to session storage whenever tasks are updated
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    const newTask: Task = {
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle(""); // Clear the input after adding a task
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const value: TaskContextType = {
    addTask: addTask,
    toggleTask: toggleTask,
    deleteTask: deleteTask,
    tasks,
    title,
    setTitle: setTitle,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Create a custom hook to use the task context
export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export {};
