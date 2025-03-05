import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message
  
  const { loginUser } = useContext(TaskContext); // Access loginUser function from context
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser(email, password)) { // Call loginUser function
      navigate('/dashboard'); // Navigate to the dashboard on successful login
    } else {
      setError('Invalid email or password'); // Set error message if login fails
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default Login;
