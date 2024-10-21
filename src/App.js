import React, { useState } from "react";
import Column from "./components/column/Column";
import TaskFormModal from "./components/modals/TaskFormModal";
import "./App.css";
import Button from "./components/button/Button";
import { initialTasks } from "./initialTaskValues";
import { useSelector, useDispatch } from "react-redux";
import { createTask, updateTask, deleteTask } from "./store/tasksSlice";
import { useTheme } from "./theme/ThemeContext";

const statuses = ["To Do", "In Progress", "Done"];

function App() {
  // Theme Context
  const { theme, toggleTheme } = useTheme();

  // Task State
  const tasks = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleCreateTask = (task) => {
    dispatch(createTask(task));
    setIsModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
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
          <button className="toggle-theme-button" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
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
          createTask={handleCreateTask}
          updateTask={handleUpdateTask}
          deleteTask={handleDeleteTask} // Move delete functionality to the modal
          selectedTask={selectedTask}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
