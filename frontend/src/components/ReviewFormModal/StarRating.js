
function StarRating({rating, setRating, hover, setHover}) {

  return (
    <div className="stars">
      {[...Array(5)].map((_star, i) => {
        const ratingValue = i + 1

        return <label key={i}>
          <input
          type="radio"
          name="rating"
          value={ratingValue}
          className='star-input'
          onClick={() => setRating(ratingValue)}
          />

          <div
          className={ratingValue <= ( hover || rating ) ? 'filled' : 'empty'}
          onMouseEnter={() => setHover(ratingValue)}
          onMouseLeave={() => setHover(null)}
          >
          <i className="fa-solid fa-star fa-2xl star"></i>
          </div>
        </label>
      })}
    </div>
  );
}

export default StarRating
