import React from "react";
import "./Modal.css";
import Button from "../button/Button";

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Are you sure you want to delete this task?</h2>
        <div className="modal-actions">
          <Button label="Delete" onClick={onConfirm} color="error" />
          <Button label="Cancel" onClick={onCancel} color="transparent" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
