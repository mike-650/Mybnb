import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StarRating from "./StarRating";
import { createNewReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      review,
      stars: rating
    };

    dispatch(createNewReview(newReview, spotId));
    closeModal();
  };

  const disabled = () => {
    if (review.length < 10) return true;
    if (!rating) return true;
    return false;
  }


  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <textarea className="review" value={review} onChange={(e) => setReview(e.target.value)} rows="8" cols="50" placeholder="Leave your review here..."></textarea>
        <div className="stars-component">
          <StarRating rating={rating} setRating={setRating} hover={hover} setHover={setHover} />
          <p style={{paddingTop:'3px'}}>Stars</p>
        </div>
        <div id="submit-review-container">
        <button id="submit-review-button" type="submit" disabled={disabled()}>Submit Your Review</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewFormModal;
