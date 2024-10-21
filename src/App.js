import React, { useState } from 'react';
import Column from './Column';
import TaskFormModal from './TaskFormModal';
import './App.css';

const initialTasks = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Complete the project setup',
    assignee: 'Alice',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Design the main UI',
    assignee: 'Bob',
    status: 'In Progress',
    priority: 'Medium',
  },
];

const statuses = ['To Do', 'In Progress', 'Done'];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    setIsModalOpen(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setIsModalOpen(false);
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const openCreateTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <div className={`content ${isModalOpen ? 'blur-background' : ''}`}>
        <h1>Jira Mock Application</h1>
        <button onClick={openCreateTaskModal} className="create-task-btn">+ Create New Task</button>
        <div className="board">
          {statuses.map(status => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              editTask={editTask}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <TaskFormModal
          createTask={createTask}
          updateTask={updateTask}
          deleteTask={deleteTask} // Move delete functionality to the modal
          selectedTask={selectedTask}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;