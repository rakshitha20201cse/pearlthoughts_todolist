import { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recurring, setRecurring] = useState('None');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({ id: Date.now().toString(), title, description, recurring });
    setTitle('');
    setDescription('');
    setRecurring('None');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white shadow-md rounded">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />
      <select
        value={recurring}
        onChange={(e) => setRecurring(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      >
        <option value="None">No Recurrence</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
