import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  // State variables for search query, category filter, and priority filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  // Function to handle deleting a task
  const handleDeleteTask = taskId => {
    onDeleteTask(taskId);
  };

  // Function to handle editing a task
  const handleEditTask = task => {
    onEditTask(task);
  };

  // Filter tasks based on search query, category filter, and priority filter
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(task => 
    (!filterType || task.category === filterType) && // Apply type filter
    (!filterPriority || task.priority === filterPriority) // Apply priority filter
  );

  return (
    <div>
      {/* Search input for filtering tasks by name or description */}
      <input
        type="text"
        placeholder="Search websites with name or description ..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2  mt-3 mb-4 border rounded focus:outline-none focus:border-blue-500"
      />

      {/* Filter dropdowns for category and priority */}
      <div className='flex  ml-2 md:ml-0 lg:flex-row flex-col'>
        <div className="mb-4  ">
          <label htmlFor="typeFilter" className=' font-thin'>Filter by Category:</label>
          <select
            id="typeFilter"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="ml-2 px-2 py-1 border rounded"
          >
            <option value="">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
          </select>
        </div>
        <div className="mb-4  lg:ml-2">
          <label htmlFor="priorityFilter" className=' font-thin'>Filter by Priority:</label>
          <select
            id="priorityFilter"
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="ml-2 px-2 py-1 border rounded"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Render TaskItem component for each filtered task */}
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
