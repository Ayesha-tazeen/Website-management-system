import React, { useState } from 'react';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';
import { v4 as uuidv4 } from 'uuid';
import "./App.css" // Import CSS file

const App = () => {
  // Retrieve tasks from local storage or use an empty array if no tasks exist
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // State variables for tasks, editTaskId, and task form visibility
  const [tasks, setTasks] = useState(initialTasks);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Function to add a new task
  const addTask = (newTask, imageData) => {
    const newTaskWithId = { id: uuidv4(), ...newTask };
    const updatedTasks = [...tasks, newTaskWithId];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Store task image data in local storage if provided
    if (imageData) {
      localStorage.setItem(`task-image-${newTaskWithId.id}`, imageData);
    }
    setShowTaskForm(false); // Close task form after adding new task
  };

  // Function to delete a task
  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.removeItem(`task-image-${taskId}`);
  };

  // Function to edit a task
  const editTask = (editedTask, imageData) => {
    const updatedTasks = tasks.map(task => (task.id === editedTask.id ? editedTask : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Store task image data in local storage if provided
    if (imageData) {
      localStorage.setItem(`task-image-${editedTask.id}`, imageData);
    } else {
      localStorage.removeItem(`task-image-${editedTask.id}`);
    }

    setEditTaskId(null);
    setShowTaskForm(false); // Close task form after editing task
  };

  // Function to handle editing a task
  const handleEditTask = task => {
    setEditTaskId(task.id);
    setShowTaskForm(true); // Open task form for editing
  };

  // Function to toggle task form visibility
  const handleToggleTaskForm = () => {
    setEditTaskId(null); // Reset editTaskId to null when toggling task form
    setShowTaskForm(prevState => !prevState); // Toggle task form visibility
  };

  return (
    <div className="bg-[#dcf2f1] min-h-screen">
      <div className="container mx-5 py-8">
        <div className="mb-4 flex justify-between items-center">
          {/* Application title */}
          <h1 className="md:text-4xl ml-2  text-2xl font-normal young-serif-regular text-[#365486]">
            Website Management Application
          </h1>
          {/* Button to toggle task form visibility */}
          <button
            onClick={handleToggleTaskForm}
            className="bg-[#365486] text-white mr-2 md:px-4 py-2 rounded md:font-bold hover:bg-[#1c3156] transition duration-200 text-xs md:text-sm h-11 md:h-auto"
          > 
            {showTaskForm ? 'Close Form' : 'Add New Website'}
          </button>
        </div>
        {/* Task form */}
        {showTaskForm && <TaskForm onAddTask={addTask} editTaskId={editTaskId} tasks={tasks} onEditTask={editTask} />}
        <div className="overflow-x-auto">
          {/* Task list */}
          <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={handleEditTask} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default App;
