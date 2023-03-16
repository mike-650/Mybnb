import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import './DeleteFormModal.css';

function DeleteFormModal({spotId}) {
  console.log('HERE : ',spotId)
  const dispatch = useDispatch();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId));
  }

  return (
    <>
    <div className="delete-modal">
    <h2>Confirm Delete</h2>
    <h3>Are you sure you want to remove this spot from the listings?</h3>
    <button onClick={confirmDelete}>Yes(Delete Spot)</button>
    <button>No(Keep Spot)</button>
    </div>
  </>
  )
}

export default DeleteFormModal;
