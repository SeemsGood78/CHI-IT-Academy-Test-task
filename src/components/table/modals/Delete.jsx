import React from "react";

const DeleteModal = ({ car, closeModal, onDelete }) => {

  const handleDelete = () => {
    onDelete(car.id);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this car?</p>
        <div className="modal-content-buttons">
          <button className="btn btn-cancel" onClick={closeModal}>Cancel</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

