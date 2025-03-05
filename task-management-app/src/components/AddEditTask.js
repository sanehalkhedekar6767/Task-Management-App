import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { Form, Button, Container } from 'react-bootstrap';

const AddEditTask = () => {
  // Accessing context for task management functions
  const { addTask, editTask, tasks } = useContext(TaskContext);

  // State for task properties
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');
  const [reminder, setReminder] = useState('');
  
  const { id } = useParams(); // URL parameter for task ID
  const navigate = useNavigate(); // Hook for navigation

  // Effect hook to load task details if editing
  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setCategory(taskToEdit.category);
        setPriority(taskToEdit.priority);
        setDeadline(taskToEdit.deadline);
        setReminder(taskToEdit.reminder);
      }
    }
  }, [id, tasks]);

  // Form submission handler for adding or editing tasks
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const newTask = {
      id: id ? id : Date.now().toString(), // Use existing ID if editing, otherwise generate new ID
      title,
      description,
      category,
      priority,
      deadline,
      reminder,
    };
    if (id) {
      editTask(id, newTask); // Update existing task
    } else {
      addTask(newTask); // Add new task
    }
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <Container>
      <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form field for task title */}
        <Form.Group controlId="formTaskTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        {/* Form field for task description */}
        <Form.Group controlId="formTaskDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        {/* Form field for task category */}
        <Form.Group controlId="formTaskCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </Form.Group>
        {/* Form field for task priority */}
        <Form.Group controlId="formTaskPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Control>
        </Form.Group>
        {/* Form field for task deadline */}
        <Form.Group controlId="formTaskDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </Form.Group>
        {/* Form field for task reminder */}
        <Form.Group controlId="formTaskReminder">
          <Form.Label>Reminder</Form.Label>
          <Form.Control type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Update Task' : 'Add Task'} {/* Button label based on action */}
        </Button>
      </Form>
    </Container>
  );
};

export default AddEditTask;
