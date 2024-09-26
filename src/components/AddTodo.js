import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../todos";
import axios from "axios";
import { Button, Container, TextField, Typography, Box, Alert } from "@mui/material";

const AddTodo = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const validateForm = () => {
    if (username.length <= 4) {
      return "Username must be more than 4 characters.";
    }
    if (title.length <= 6) {
      return "Title must be more than 6 characters.";
    }
    if (content.length < 6) {
      return "Content must be greater than 6 characters.";
    }
    return null;
  };

  const handleAddTodo = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        username,
        title,
        content,
        completed: false,
      });
      dispatch(addTodo(response.data));
      setUsername("");
      setTitle("");
      setContent("");
      setError(null); // clear errors
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 4, 
          p: 3, 
          boxShadow: 3, 
          borderRadius: 2, 
          backgroundColor: "background.paper" 
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add New Todo
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{ mt: 3 }}
        >
          Add To-Do
        </Button>
      </Box>
    </Container>
  );
};

export default AddTodo;
