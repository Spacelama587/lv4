import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo, addComment } from "../todos"; 
import { Box, Typography, Button, Paper, TextField, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { MdEdit, MdSave } from "react-icons/md";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) => 
    state.todos.todos.find(todo => todo.id.toString() === id)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const [userIdError, setUserIdError] = useState("");

  if (!todo) {
    return <Typography variant="h6">Todo not found</Typography>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTodo(editedTodo));
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({ ...prev, [name]: value }));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    if (value.length < 4) {
      setUserIdError("User ID must be at least 4 characters long");
    } else {
      setUserIdError("");
    }
  };

  const handleCommentSubmit = () => {
    if (userId.length >= 4 && comment.trim()) {
      dispatch(addComment({ todoId: todo.id, userId, comment }));
      setUserId("");
      setComment("");
    }
  };
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={editedTodo.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={editedTodo.username}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="content"
              label="Content"
              value={editedTodo.content}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdSave />}
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>{todo.title}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>By:</strong> {todo.username}</Typography>
            <Typography variant="body1" paragraph><strong>Content:</strong> {todo.content}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdEdit />}
              onClick={handleEdit}
            >
              Edit Todo
            </Button>
          </>
        )}
        <Button onClick={toggleDrawer} sx={{ mt: 2 }}>
          {drawerOpen ? "Click to view post" : "Click to view comments"}
        </Button>
      </Paper>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ padding: "20px", width: "auto" }}>
          <Typography variant="h6" gutterBottom>Comments</Typography>
          <List>
            {todo.comments && todo.comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemText primary={comment.userId} secondary={comment.comment} />
              </ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            label="User ID"
            value={userId}
            onChange={handleUserIdChange}
            error={!!userIdError}
            helperText={userIdError}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />
          <Button
            variant="contained"
            onClick={handleCommentSubmit}
            disabled={userId.length < 4 || !comment.trim()}
            sx={{ mt: 2 }}
          >
            Post Comment
          </Button>
        </Box>
      </Drawer>
    </Box>
    
  );
};

export default TodoDetail;