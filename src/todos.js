import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get('http://localhost:5000/todos');
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todoData) => {
    const response = await axios.post('http://localhost:5000/todos', todoData);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    return id;
  }
);
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo) => {
    const response = await axios.put(`http://localhost:5000/todos/${updatedTodo.id}`, updatedTodo);
    return response.data;
  }
);
export const addComment = createAsyncThunk(
  'todos/addComment',
  async ({ todoId, userId, comment }) => {
    const response = await axios.post(`http://localhost:5000/todos/${todoId}/comments`, { userId, comment });
    return { todoId, comment: response.data };
  }
);
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { todoId, comment } = action.payload;
        const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
        if (todoIndex !== -1) {
          if (!state.todos[todoIndex].comments) {
            state.todos[todoIndex].comments = [];
          }
          state.todos[todoIndex].comments.push(comment);
        }
      });
  }
});

export default todosSlice.reducer;