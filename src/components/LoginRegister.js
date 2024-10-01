import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    id: "",
    password: ""
  });

  const [registerCredentials, setRegisterCredentials] = useState({
    id: "",
    password: ""
  });

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

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://3.38.191.164/login", loginCredentials);
      console.log("Login successful:", res.data);
      setIsAuthenticated(true); // Set authentication state
      localStorage.setItem("token", res.data.token); // Store token in local storage
      navigate("/"); // Redirect after login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Login failed: Invalid credentials or user does not exist.");
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  // Handle register submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://3.38.191.164/register", registerCredentials);
      console.log("Registration successful:", res.data);
      setIsAuthenticated(true);
      navigate("/"); // Automatically navigate after registration
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Registration failed: User ID already exists or invalid input.");
      } else {
        console.error("Registration failed:", error.message);
      }
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
    backgroundColor: isLogin ? '#007bff' : '#ff9800',
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
    color: isLogin ? '#007bff' : '#ff9800'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="id"
            value={loginCredentials.id}
            onChange={handleLoginChange}
            placeholder="ID"
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
            name="id"
            value={registerCredentials.id}
            onChange={handleRegisterChange}
            placeholder="ID"
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
