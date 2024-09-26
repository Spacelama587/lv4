import React from "react";

const TodoCard = ({ title, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        width: '150px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h3>{title}</h3>
    </div>
  );
};

export default TodoCard;