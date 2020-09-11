import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  return (
    <div className="row">
      <div className="col-12 px-0">
        {reviews.map((review, index) => (
          <ReviewItem key="index" {...review} />
        ))}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.array,
};

export default ReviewList;
