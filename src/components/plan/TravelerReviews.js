import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from '../review/ReviewList';
import Rating from 'react-rating';

const TravelerReviews = ({ stars, reviews }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>Traveler reviews</h2>
        <p>
          {stars} &nbsp;
          <Rating
            initialRating={stars}
            fullSymbol={<i className="fas fa-star" />}
            emptySymbol={<i className="far fa-star" />}
          />
        </p>
      </div>
      <div className="col-md-8 col-sm-12">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

TravelerReviews.propTypes = {
  stars: PropTypes.number,
  reviews: PropTypes.array,
};

export default TravelerReviews;
