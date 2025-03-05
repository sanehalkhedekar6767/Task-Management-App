import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  // Accessing the context for tasks, user, and functions
  const { tasks, deleteTask, user, logoutUser } = useContext(TaskContext);
  const navigate = useNavigate(); // Hook for navigation
  // State for search query and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDeadline, setFilterDeadline] = useState('');

  // Logout function
  const handleLogout = () => {
    logoutUser(); // Clear user data from context
    navigate('/'); // Redirect to login page
  };

  // Filtering tasks based on search and filter criteria
  const filteredTasks = tasks.filter(task => 
    (searchQuery === '' || task.title.includes(searchQuery)) &&
    (filterCategory === '' || task.category === filterCategory) &&
    (filterPriority === '' || task.priority === filterPriority) &&
    (filterDeadline === '' || task.deadline === filterDeadline)
  );

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Display user greeting if logged in */}
      {user && <p>Welcome, {user.username}!</p>}
      <button onClick={handleLogout}>Logout</button>
      {/* Link to add a new task */}
      <Link to="/add"><button>Add Task</button></Link>
      <div>
        {/* Input field for searching tasks */}
        <input 
          type="text" 
          placeholder="Search Tasks" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Dropdown for filtering tasks by category */}
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        {/* Dropdown for filtering tasks by priority */}
        <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {/* Input field for filtering tasks by deadline */}
        <input 
          type="date" 
          value={filterDeadline}
          onChange={(e) => setFilterDeadline(e.target.value)}
        />
      </div>
      <h3>Tasks</h3>
      <ul>
        {/* Display filtered tasks with options to edit or delete */}
        {filteredTasks.map(task => (
          <li key={task.id}>
            {task.title} (Category: {task.category}, Priority: {task.priority}, Deadline: {task.deadline})
            {/* Link to edit task */}
            <Link to={`/edit/${task.id}`}><button>Edit</button></Link>
            {/* Button to delete task */}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
