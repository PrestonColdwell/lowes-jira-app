import React, { useState } from "react";
import Column from "./Column";
import TaskFormModal from "./TaskFormModal";
import "./App.css";
import Button from "./Button";

const initialTasks = [
  {
    id: 1,
    name: "Interview Round 1",
    description: "Complete the phone screening with Lowe's recruiter",
    assignee: "Preston",
    status: "Done",
    priority: "High",
  },
  {
    id: 2,
    name: "Prep for Technical Discussion",
    description: "Complete technical discussion with Gopal",
    assignee: "Preston",
    status: "Done",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Interview Round 2",
    description: "Complete technical discussion with Gopal",
    assignee: "Preston",
    status: "Done",
    priority: "High",
  },
  {
    id: 4,
    name: "Prep for Technical Interview (Coding w/ React)",
    description: "Review React concepts and prepare for coding interview",
    assignee: "Preston",
    status: "Done",
    priority: "Medium",
  },
  {
    id: 5,
    name: "Technical Interview",
    description: "Complete technical interview with Pushpak",
    assignee: "Preston",
    status: "Done",
    priority: "High",
  },
  {
    id: 6,
    name: "Iterate on Jira Mock Application",
    description:
      "Implement proper functionality and styling for mock application",
    assignee: "Preston",
    status: "In Progress",
    priority: "Low",
  },
  {
    id: 7,
    name: "Prepare for Possible Additional Interviews",
    description: "Prepare for possible additional interviews with Lowe's",
    assignee: "Preston",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 8,
    name: "Hopefully Get the Job",
    description:
      "Hope that the preparation, successful interviews and passion towards Lowe's will land me the job",
    assignee: "Preston",
    status: "To Do",
    priority: "High",
  },
];

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
          style={{ padding: "10px 60px", marginBottom: "20px", fontSize: "1.2rem" }}
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
