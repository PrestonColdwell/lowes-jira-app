import React from 'react';
import './Column.css';
import Task from './Task';

function Column({ status, tasks, editTask }) {
  return (
    <div className="column">
      <h3>{status}</h3>
      {tasks.map(task => (
        <Task key={task.id} task={task} onEdit={editTask} />
      ))}
    </div>
  );
}

export default Column;