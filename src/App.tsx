import React from "react";
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
import { AddTask, Delete } from "@mui/icons-material";
import { useTask } from "./Context/TaskProvider";

const App: React.FC = () => {
  const { addTask, toggleTask, deleteTask, tasks, title, setTitle } = useTask();

  return (
    <Container maxWidth="sm">
      <Typography
        data-testid="todo-title"
        variant="h2"
        sx={{ textAlign: "center", my: 4 }}
      >
        My ToDo
      </Typography>
      <Paper style={{ padding: 16 }}>
        <TextField
          data-testid="task-input"
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
              <IconButton data-testid="add-test-button" onClick={addTask}>
                <AddTask />
              </IconButton>
            ),
          }}
        />
        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              data-testid={`task-${task.title}`}
              secondaryAction={
                <IconButton
                  data-testid="delete-test-button"
                  edge="end"
                  onClick={() => deleteTask(index)}
                >
                  <Delete />
                </IconButton>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              <ListItemText
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                primary={task.title}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default App;
