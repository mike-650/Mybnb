import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState({});
  const [reviewButton, setReviewButton] = useState('submit-review-button-disabled');
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    const errorValidation = {};

    if (review.length > 255) {
      errorValidation.review = "Review must be less than 255 characters"
      setError(errorValidation);
      return;
    } else if (!review.trim().length) {
      errorValidation.review = "Review must be at least 10 characters"
      setError(errorValidation);
      return;
    }

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

  useEffect(() => {
    if (review.length >= 10 && rating) {
      setReviewButton('submit-review-button-enabled');
    }
  }, [rating, review])

  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        { error.review ? <div style={{color:'#db1709', display:'flex', justifyContent:'center', paddingBottom:'10px'}}>{error.review}</div> : null }
        <textarea className="review" value={review} onChange={(e) => setReview(e.target.value)} rows="8" cols="50" placeholder="Leave your review here..."></textarea>
        <div className="stars-component">
          <StarRating rating={rating} setRating={setRating} hover={hover} setHover={setHover} />
          <p style={{paddingTop:'3px'}}>Stars</p>
        </div>
        <div id="submit-review-container">
        <button id={reviewButton} type="submit" disabled={disabled()}>Submit Your Review</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewFormModal;
