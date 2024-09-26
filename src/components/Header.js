import React from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";


const Header = () => {
  return (
    <header style={{
      padding: '10px 20px',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
      <IoHome />
      </Link>
    </header>
  );
};

export default Header;