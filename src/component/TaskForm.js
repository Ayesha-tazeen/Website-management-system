import React, { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const TaskForm = ({ onAddTask, editTaskId, tasks, onEditTask }) => {
  // State variables for form inputs, errors, and image
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');
  const [img, setImg] = useState(null);

  // Effect to populate form fields when editing a task
  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = tasks.find(task => task.id === editTaskId);
      if (taskToEdit) {
        setEditTask(taskToEdit);
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setDeadline(taskToEdit.deadline);
        setCategory(taskToEdit.category);
        setPriority(taskToEdit.priority);
        setImg(taskToEdit.img);
      } else {
        setEditTask(null);
        setTitle('');
        setDescription('');
        setDeadline('');
        setCategory('');
        setPriority('');
        setImg(null);
      }
    } else {
      setEditTask(null);
      setTitle('');
      setDescription('');
      setDeadline('');
      setCategory('');
      setPriority('');
      setImg(null);
    }
  }, [editTaskId, tasks]);

  // Function to handle image change
  const handleImgChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Function to handle image deletion
  const handleDeleteImg = () => {
    setImg(null);
    document.getElementById('imageInput').value = '';
  };

  // Function to handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    // Validation for title
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    } else {
      setTitleError('');
    }

    // Validation for deadline
    if (!deadline) {
      setDeadlineError('Deadline is required');
      return;
    } else {
      setDeadlineError('');
    }

    // Adding or updating task based on editTaskId
    if (editTaskId) {
      onEditTask({ ...editTask, title, description, deadline, category, priority, img });
    } else {
      onAddTask({ title, description, deadline, category, priority, img });
    }

    // Resetting form fields and image
    setTitle('');
    setDescription('');
    setDeadline('');
    setCategory('');
    setPriority('');
    setImg(null);
    document.getElementById('imageInput').value = '';
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-[#1c3156] mb-4">{editTaskId ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <input
          type="text"
          placeholder="Enter website title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-2"
        />
        {titleError && <p className="text-red-500 text-xs italic">{titleError}</p>}

        {/* Description textarea */}
        <textarea
          placeholder="Enter website description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-2"
        ></textarea>

        {/* Deadline input */}
        <input
          type="date"
          placeholder="Enter deadline"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-2"
        />
        {deadlineError && <p className="text-red-500 text-xs italic">{deadlineError}</p>}

        {/* Category select */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-2"
        >
          <option value="">Select Category</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
          {/* Add more options as needed */}
        </select>

        {/* Priority select */}
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-2"
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Image preview and delete button */}
        {img && (
          <div className="mb-2 flex flex-row items-center">
            <img src={img} alt="Selected" style={{ height: '50px', width: 'auto', border: '1px solid black' }} />
            <button
              type="button"
              onClick={handleDeleteImg}
              className="ml-2 p-1 text-white  bg-[#516ea1] rounded hover:bg-[#1c3156] hover:text-white"
            >
              <ClearIcon />
            </button>
          </div>
        )}

        {/* Image upload input */}
        <input type="file" id="imageInput" onChange={handleImgChange} className="w-full py-2" />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-[#365486] text-white px-4 py-2 rounded hover:bg-[#1c3156] transition duration-300"
        >
          {editTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
