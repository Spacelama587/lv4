import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import TodoCard from "./TodoCard";
import { IoAddCircle } from "react-icons/io5";
import { IoTelescope } from "react-icons/io5";
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <LoginRegister setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', justifyContent:'space-between', alignItems:'center'}}>
          <TodoCard 
            title={(
              <>
                Add Todo <IoAddCircle />
              </>
            )}
            onClick={() => handleCardClick("/add-todo")}
          />
          <TodoCard 
             title={(
              <>
                View Todos <IoTelescope />
              </>
            )}
            onClick={() => handleCardClick("/view-todos")}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
