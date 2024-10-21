import React, { useState, useEffect } from "react";
import "./Modal.css";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";

function TaskFormModal({
  createTask,
  updateTask,
  deleteTask,
  selectedTask,
  closeModal,
}) {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    assignee: "",
    priority: "",
    status: "",
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTaskData(selectedTask);
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      updateTask(taskData);
    } else {
      createTask(taskData);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h2>{selectedTask ? "Edit Task" : "Create New Task"}</h2>

          {/* SVG Trashcan Icon */}
          {selectedTask && (
            <div className="trashcan-icon" onClick={handleDeleteClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="#8B0000"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M10 11v6m4-6v6m-2 0h-1m5-12H6v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6z" />
              </svg>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={taskData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={taskData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="assignee"
              placeholder="Assignee"
              value={taskData.assignee}
              onChange={handleChange}
            />
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="modal-actions">
              <Button
                label={selectedTask ? "Update Task" : "Create Task"}
                color="default"
                type="submit"
              />
              <Button
                label="Close"
                color="transparent"
                type="button"
                onClick={closeModal}
              />
            </div>
          </form>
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}

export default TaskFormModal;
