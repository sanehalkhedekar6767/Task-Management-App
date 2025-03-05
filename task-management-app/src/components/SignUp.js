import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const SignUp = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [name, setName] = useState(''); // State for name input
  
  const { signUpUser } = useContext(TaskContext); // Access signUpUser function from context
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password, name }; // Create user data object
    signUpUser(userData); // Call signUpUser function
    navigate('/'); // Navigate to the login page
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default SignUp;
