import React from "react";
import "./Task.css";

function Task({ task, onEdit }) {
  const priorityColors = {
    Low: "#ffff99",
    Medium: "#ffa500",
    High: "#ff6347",
  };

  return (
    <div className="task-container">
      <div className="task-details" onClick={() => onEdit(task)}>
        <h3>{task.name}</h3>
        {task.description ? (
          <p>{task.description}</p>
        ) : (
          <p style={{ fontStyle: "italic" }}>No Task Description</p>
        )}
        {task.assignee && (
          <p>
            <strong>Assigned to:</strong> {task.assignee}
          </p>
        )}
      </div>
      <div
        className="task-priority"
        style={{ backgroundColor: priorityColors[task.priority] }}
      >
        <div className="priority-bubble">{task.priority}</div>
      </div>
    </div>
  );
}

export default Task;
