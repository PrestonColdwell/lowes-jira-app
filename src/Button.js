import React from 'react';
import './Button.css';

const Button = ({ label, onClick, color = 'default', type = 'button' }) => {
  return (
    <button className={`custom-button ${color}`} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;