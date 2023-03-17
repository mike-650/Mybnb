import { useDispatch } from "react-redux";
import { deleteUserReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";

function DeleteReviewModal({ reviewId }) {
  // console.log('HERE : ',spotId)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  console.log('REVIEW ID :  ', reviewId);
  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUserReview(reviewId))
    closeModal()
  };

  return (
    <>
      <div className="delete-review-modal">
        <h2>Confirm Delete</h2>
        <h3>Are you sure you want to delete this review?</h3>
        <button onClick={confirmDelete}>Yes(Delete Review)</button>
        <button>No(Keep Review)</button>
      </div>
    </>
  )
}

export default DeleteReviewModal;
