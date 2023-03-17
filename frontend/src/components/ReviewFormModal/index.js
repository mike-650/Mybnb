import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StarRating from "./StarRating";
import { createNewReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

function ReviewFormModal({spotId}) {
  const dispatch = useDispatch();
  const [ review, setReview ] = useState("");
  const [ rating, setRating ] = useState(null);
  const [ hover, setHover] = useState(null);
  const [ error, setError ] = useState(null);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      review,
      stars: rating
    };

    const data = await dispatch(createNewReview(newReview, spotId));
    if (data.error) {
      setError(data.error);
    } else {
      closeModal()
    }
  };

  const disabled = () => {
    if (review.length < 10) return true;
    if (!rating) return true;
    return false;
  }


  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      { error ? <p className="error">{error}</p> : null }
      <form onSubmit={handleSubmit}>
        <textarea className="review" value={review} onChange={(e) => setReview(e.target.value)} rows="8" cols="50" placeholder="Leave your review here..."></textarea>
        <div className="stars-component">
        <StarRating rating={rating} setRating={setRating} hover={hover} setHover={setHover} />
        <p>Stars</p>
        </div>
        <button type="submit" disabled={disabled()}>Submit Your Review</button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
