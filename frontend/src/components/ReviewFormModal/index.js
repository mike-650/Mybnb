import React, { useState } from "react";
import StarRating from "./StarRating";
import "./ReviewForm.css";

function ReviewFormModal() {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const invalidReviewLength = review.length < 10

  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <textarea className="review" value={review} onChange={(e) => setReview(e.target.value)} rows="8" cols="50" placeholder="Leave your review here..."></textarea>
        <div className="stars-component">
        <StarRating />
        <p>Stars</p>
        </div>
        <button type="submit" disabled={invalidReviewLength}>Submit Your Review</button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
