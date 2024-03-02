import React, { useState, useEffect } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

const TaskItem = ({ task, onDeleteTask, onEditTask }) => {
  const taskKey = `task_${task.id}_completed`; // Generate a stable key using task ID

  // State to track whether the task is completed
  const [completed, setCompleted] = useState(() => {
    const storedCompleted = localStorage.getItem(taskKey);
    return storedCompleted ? storedCompleted === 'true' : false;
  });

  // Effect to update local storage when the task completion state changes
  useEffect(() => {
    localStorage.setItem(taskKey, completed.toString());
  }, [taskKey, completed]);

  // Function to handle task deletion
  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  // Function to handle task editing
  const handleEdit = () => {
    onEditTask(task);
  };

  // Function to toggle task completion state
  const handleToggleCompletion = () => {
    setCompleted(!completed);
  };

  // Function to check if the task deadline is near
  const isDeadlineNear = () => {
    if (completed) {
      return false; // If task is already completed, deadline is not near
    }
    const deadlineDate = new Date(task.deadline);
    const oneWeekFromToday = new Date();
    const today = new Date();
    oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7);
    return deadlineDate <= oneWeekFromToday && deadlineDate >= today;
  };

  // Function to check if the task deadline has passed
  const isDeadlineOver = () => {
    if (completed) {
      return false; // If task is already completed, deadline is not over
    }
    const deadlineDate = new Date(task.deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  return (


<div className='bg-white p-6 rounded shadow-lg mb-2'>
  <div className="flex flex-col md:flex-row justify-between">
    <div className="md:w-2/3 md:pr-4"> {/* Adjust width for medium screens */}
      <div className='flex flex-row'>
        {/* Task title */}
        <h3 className="md:text-xl text-lg text-[#365486] noto-serif font-bold mb-2" style={{ maxWidth: '70%' }}>
          {task.title.charAt(0).toUpperCase() + task.title.slice(1).toLowerCase()}
        </h3>
        {/* Checkbox for task completion */}
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleCompletion}
          className="ml-3 mb-1 "
          style={{ transform: 'scale(1.5)' }}
        />
      </div>

      {/* Task description */}
      <p className="text-gray-600 md:text-sm text-xs mb-2" style={{ maxWidth: '80%' }}>{task.description}</p>

      {/* Task deadline, category, and priority */}
      <p className="md:text-sm text-xs text-gray-500">Deadline: {task.deadline}</p>
      <p className="md:text-sm text-xs text-gray-500">Category: {task.category}</p>
      <p className="md:text-sm text-xs text-gray-500">Priority: {task.priority}</p>
    </div>
    <div className="md:w-1/3 md:pl-4 flex "> {/* Adjust width for medium screens */}
      {/* Task image */}
      {task.img && (typeof task.img === 'string' || task.img instanceof File) && (
        <img
          src={typeof task.img === 'string' ? task.img : URL.createObjectURL(task.img)}
          alt="Task_Image"
          className="object-cover shadow-md shadow-[#357a8c] rounded-sm w-24 h-24 md:w-auto md:h-auto" 
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      )}
    </div>
  </div>
  <div className="mt-4">
    {/* Button to edit the task */}
    <button
      onClick={handleEdit}
      className="bg-[#365486] text-white px-3 py-1 rounded mr-2 hover:bg-[#1c3156] transition duration-300"
    >
      Edit <EditNoteIcon />
    </button>
    {/* Button to delete the task */}
    <button
      onClick={handleDelete}
      className="bg-[#7FC7D9] text-white px-3 py-1 rounded hover:bg-[#357a8c] transition duration-300"
    >
      Delete <RemoveCircleOutlineIcon />
    </button>
  </div>

  {/* Notification for deadline proximity */}
  {!completed && isDeadlineNear() && (
    <p className="text-red-500">Deadline is near...!</p>
  )}
  {/* Notification for passed deadline */}
  {!completed && isDeadlineOver() && (
    <p className="text-red-500">Deadline passed and task incomplete ...!</p>
  )}
</div>




  );
};

export default TaskItem;

