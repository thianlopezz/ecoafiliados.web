import React from 'react';
import PropTypes from 'prop-types';
import TitleDescriptionCard from '../common/cards/TitleDescriptionCard';
import IncluidoList from '../incluido/IncluidoList';
import Avatar from '../common/Avatar';
import TitleDescription from '../common/TitleDescription';
import Rating from 'react-rating';

const ReviewItem = ({ image, stars, comentario, nombre, fecha }) => {
  return (
    <div className="row">
      <div className="col-12 px-0">
        <div className="d-flex">
          <div className="p-2">
            <Avatar image={image} size="50px" />
          </div>
          <div className="p-2 author">
            <div>{nombre}</div>
            <div className="text-muted">
              <Rating
                initialRating={stars}
                fullSymbol={<i className="fas fa-star" />}
                emptySymbol={<i className="far fa-star" />}
              />
            </div>
          </div>
          <div className="ml-auto p-2 my-auto">
            <span className="text-muted">{fecha}</span>
          </div>
        </div>
      </div>
      <div className="col-12 px-0">
        <p>{comentario}</p>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  image: PropTypes.string,
  stars: PropTypes.number,
  comentario: PropTypes.string,
  nombre: PropTypes.string,
  fecha: PropTypes.string,
};

export default ReviewItem;
