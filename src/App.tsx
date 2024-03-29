import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { Task } from "./Task";
import { AddTask, Delete } from "@mui/icons-material";
import { TaskProvider, useTask } from "./Context/TaskContext";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");

  //react context provider
  const { task, toggleTask } = useTask();

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

  const toggleTaskCompletion = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <TaskProvider>
      {" "}
      {/* Wrap your components with ThemeProvider if not already done in index.tsx */}
      <Container maxWidth="sm" className={task}>
        {" "}
        {/* Example of using theme as a class name */}
        <Typography variant="h2" sx={{ textAlign: "center", my: 4 }}>
          TODO LIST
        </Typography>
        <Paper style={{ padding: 16 }}>
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            placeholder="Add Task"
            InputProps={{
              endAdornment: (
                <IconButton onClick={addTask}>
                  <AddTask />
                </IconButton>
              ),
            }}
          />
          <List>
            {tasks.map((task, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteTask(index)}>
                    <Delete />
                  </IconButton>
                }
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <ListItemText primary={task.title} />
              </ListItem>
            ))}
          </List>
          <button onClick={toggleTask}>Toggle Task</button>{" "}
          {/* Example button to toggle theme */}
        </Paper>
      </Container>
    </TaskProvider>
  );
};

export default App;
