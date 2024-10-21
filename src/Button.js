import React from 'react';
import './Button.css';

const Button = ({ label, onClick, color = 'default', type = 'button', style = {} }) => {
  return (
    <button
      className={`custom-button ${color}`}
      onClick={onClick}
      type={type}
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;