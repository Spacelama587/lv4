import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../todos"; // action
import axios from "axios";

const TodosList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  // Useeffect + fetch
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        dispatch(setTodos(response.data));
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <div>
      <h2>Your To-Do List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
