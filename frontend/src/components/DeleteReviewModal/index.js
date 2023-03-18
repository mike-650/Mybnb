import { useDispatch } from "react-redux";
import { deleteUserReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './DeleteReviewModal.css';

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUserReview(reviewId, spotId))
    closeModal()
  };

  const cancelDelete = () => {
    closeModal()
  }

  return (
    <div>
      <div className="delete-review-modal">
        <div>
        <h2 style={{margin:'5px'}}>Confirm Delete</h2>
        </div>
        <h4 style={{fontSize:'18px'}}>Are you sure you want to delete this review?</h4>
        <div className="delete-review-buttons">
        <button id='confirm-delete' onClick={confirmDelete}>Yes (Delete Review)</button>
        </div>
        <div className="delete-review-buttons">
        <button id='cancel-delete' onClick={cancelDelete}>No (Keep Review)</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteReviewModal;
