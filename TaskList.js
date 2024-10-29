import Task from './Task';

const TaskList = ({ tasks, deleteTask }) => (
  <div className="mt-4">
    {tasks.length === 0 ? (
      <p className="text-center text-gray-500">No tasks available</p>
    ) : (
      tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} />
      ))
    )}
  </div>
);

export default TaskList;
