import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../todos"; 
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, List, ListItem, Link, IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
import Pagination from "./Pagination"; // Import your Pagination component

const ViewTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5); // Set the number of todos to display per page

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Handle delete action
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      dispatch(deleteTodo(id)); 
    }
  };

  // Calculate the current todos to display
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your To-Do List
      </Typography>

      <List>
        {currentTodos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              padding: "10px 0",
              borderBottom: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                component={RouterLink}
                to={`/todo/${todo.id}`}
                underline="none"
                color="primary"
              >
                <Typography variant="h6">{todo.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  by {todo.username}
                </Typography>
              </Link>
            </Box>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(todo.id)}
            >
              <MdDelete color="red" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Pagination Component */}
      <Pagination 
        todosPerPage={todosPerPage} 
        totalTodos={todos.length} 
        paginate={paginate} 
      />
    </Box>
  );
};

export default ViewTodos;
