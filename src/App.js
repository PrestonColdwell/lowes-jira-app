import React, { useState } from "react";
import Column from "./components/column/Column";
import TaskFormModal from "./components/modals/TaskFormModal";
import "./App.css";
import Button from "./components/button/Button";
import { initialTasks } from "./initialTaskValues";

const statuses = ["To Do", "In Progress", "Done"];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    setIsModalOpen(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
      <div className={`content ${isModalOpen ? "blur-background" : ""}`}>
        <div className="header">
          <img
            src="/lowes-logo.png"
            alt="Lowes Logo"
            style={{ width: "100px" }}
          />
          <h2>X</h2>
          <img
            src="/jira-logo.png"
            alt="Jira Logo"
            style={{ width: "100px" }}
          />
        </div>
        <Button
          label="+ Create New Task"
          color="default"
          type="button"
          onClick={openCreateTaskModal}
          style={{
            padding: "10px 60px",
            marginBottom: "20px",
            fontSize: "1.2rem",
          }}
        />
        <div className="board">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
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
