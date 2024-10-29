const Task = ({ task, deleteTask }) => (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded mb-2 transition duration-200 hover:shadow-lg">
      <div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">Recurring: {task.recurring}</p>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 transition duration-200"
      >
        Delete
      </button>
    </div>
  );
  
  export default Task;
  