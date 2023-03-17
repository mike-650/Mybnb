import { useDispatch } from "react-redux";
import { deleteUserReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";

function DeleteReviewModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUserReview(reviewId))
    closeModal()
  };

  const cancelDelete = () => {
    closeModal()
  }

  return (
    <>
      <div className="delete-review-modal">
        <h2>Confirm Delete</h2>
        <h3>Are you sure you want to delete this review?</h3>
        <button onClick={confirmDelete}>Yes(Delete Review)</button>
        <button onClick={cancelDelete}>No(Keep Review)</button>
      </div>
    </>
  )
}

export default DeleteReviewModal;
