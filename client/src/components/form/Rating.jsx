import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ rating, onChange, error }) => {
  return (
    <div className="rating-container">
      {[...Array(5)].map((_, index) => {
        const currRate = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rate"
              value={currRate}
              onClick={() => onChange(currRate)}
              style={{ display: 'none' }}
            />
            <FaStar
              size={32}
              color={currRate <= rating ? "gold" : "grey"}
            />
          </label>
        );
      })}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default Rating;