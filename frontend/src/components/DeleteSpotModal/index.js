import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal'
import { useState } from 'react';
import './DeleteSpotModal.css';

function DeleteFormModal({spotId}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId))
    closeModal()
  }

  return (
      <div>
      <div className="delete-review-modal">
        <div>
        <h2 style={{margin:'5px'}}>Confirm Delete</h2>
        </div>
        <h4 style={{fontSize:'18px'}}>Are you sure you want to remove this spot from the listings?</h4>
        <div className="delete-review-buttons">
        <button id='confirm-delete' onClick={confirmDelete}>Yes (Delete Spot)</button>
        </div>
        <div className="delete-review-buttons">
        <button id='cancel-delete' onClick={closeModal}>No (Keep Spot)</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteFormModal;
