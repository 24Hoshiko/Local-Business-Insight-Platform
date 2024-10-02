import React from 'react';

const TextReview = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="review">Your Review (optional):</label>
      <textarea
        id="review"
        name="review"
        rows="4"
        cols="50"
        placeholder="Write your review here..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextReview;