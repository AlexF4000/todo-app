// src/App.tsx
import React, { useState } from "react";
import { Task } from "./models/Task";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" sx={{ textAlign: "center", my: 4 }}>
        TODO LIST
      </Typography>
      <Paper style={{ padding: 16 }}>
        <TextField
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && newTaskTitle) {
              addTask(newTaskTitle);
            }
          }}
          placeholder="Add Task"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => newTaskTitle && addTask(newTaskTitle)}>
                <AddBoxIcon />
              </IconButton>
            ),
          }}
        />
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <ListItemText primary={task.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default App;
