import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddTodo from "./components/AddTodo";
import ViewTodos from "./components/ViewTodos";
import TodoDetail from "./components/TodoDetail";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-todo" element={<AddTodo />} />
            <Route path="/view-todos" element={<ViewTodos />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;