import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: ""
  });

  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    password: ""
  });

  // function to switch between Login and Register
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevCred) => ({
      ...prevCred,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterCredentials((prevCred) => ({
      ...prevCred,
      [name]: value
    }));
  };

  // handleSubmit for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/users");
      const user = res.data.find(
        (u) =>
          u.username === loginCredentials.username &&
          u.password === loginCredentials.password
      );
      if (user) {
        console.log("Login successful");
        setIsAuthenticated(true); // Mark as authenticated
        navigate("/"); // Redirect after login
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Submit registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", registerCredentials);
      setIsAuthenticated(true); // Automatically log in after registration
    } catch (error) {
      console.error("Registration failed", error);
    }
  };


  const containerStyle = {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: isLogin ? '#007bff' : '#ff9800', // Blue - login, orange - register
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const toggleButtonStyle = {
    backgroundColor: '#f0f0f0',
    color: '#007bff',
    border: 'none',
    marginTop: '10px',
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  const titleStyle = {
    color: isLogin ? '#007bff' : '#ff9800' // Title color change
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="username"
            value={loginCredentials.username}
            onChange={handleLoginChange}
            placeholder="Username"
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            value={loginCredentials.password}
            onChange={handleLoginChange}
            placeholder="Password"
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="username"
            value={registerCredentials.username}
            onChange={handleRegisterChange}
            placeholder="Username"
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            value={registerCredentials.password}
            onChange={handleRegisterChange}
            placeholder="Password"
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
      )}
      <button onClick={toggleForm} style={toggleButtonStyle}>
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default LoginRegister;
