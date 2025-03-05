import React, { createContext, useState, useEffect } from 'react';

// Create Task Context
export const TaskContext = createContext();

// TaskProvider component to provide context values to children components
export const TaskProvider = ({ children }) => {

  // State to store tasks
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  // State to store the currently logged-in user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  // State to store all registered users
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

  // Use effect to save tasks to local storage when tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Use effect to save the current user to local storage when user state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Use effect to save users to local storage when users state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to edit an existing task
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to log in a user
  const loginUser = (email, password) => {
    const foundUser = users.find(user => user.email === email && user.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Function to sign up a new user
  const signUpUser = (userData) => {
    setUsers([...users, userData]);
    setUser(userData);
  };

  // Function to log out the current user
  const logoutUser = () => {
    setUser(null);
  };

  // Function to check reminders for tasks
  const checkReminders = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (task.reminder && new Date(task.reminder) <= now) {
        alert(`Reminder: ${task.title}`);
        editTask(task.id, { ...task, reminder: null });
      }
    });
  };

  // Use effect to check reminders every minute
  useEffect(() => {
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, user, loginUser, signUpUser, logoutUser }}>
      {children}
    </TaskContext.Provider>
  );
};
