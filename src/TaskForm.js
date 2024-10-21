import React, { useState, useEffect } from "react";

function TaskForm({ createTask, updateTask, selectedTask }) {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    assignee: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTaskData({
        ...selectedTask,
      });
    } else {
      setTaskData({
        name: "",
        description: "",
        assignee: "",
        priority: "",
        status: "",
      });
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
    setTaskData({
      name: "",
      description: "",
      assignee: "",
      priority: "",
      status: "",
    });
  };

  return (
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
        <option value="" disabled>
          Select Priority
        </option>{" "}
        {/* Placeholder */}
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
        <option value="" disabled>
          Select Status
        </option>{" "}
        {/* Placeholder */}
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        type="submit"
        disabled={
          !taskData.name ||
          !taskData.description ||
          !taskData.assignee ||
          !taskData.priority ||
          !taskData.status
        }
      >
        {selectedTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;
