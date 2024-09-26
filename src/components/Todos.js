import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../todos";
import axios from "axios";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/todos", {
          title: newTodo,
          completed: false,
        });
        dispatch(addTodo(response.data));
        setNewTodo("");
      } catch (error) {
        console.error("Failed to add todo", error);
      }
    }
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <input
        type="text"
        placeholder="Add new to-do"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add To-Do</button>

      <h3>Todos:</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;