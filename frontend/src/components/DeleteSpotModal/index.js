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
    dispatch(deleteSpot(spotId)).then(closeModal)
  }

  return (
    <>
    <div className="delete-modal">
    <h2>Confirm Delete</h2>
    <h3>Are you sure you want to remove this spot from the listings?</h3>
    <button onClick={confirmDelete}>Yes(Delete Spot)</button>
    <button onClick={closeModal}>No(Keep Spot)</button>
    </div>
  </>
  )
}

export default DeleteFormModal;
