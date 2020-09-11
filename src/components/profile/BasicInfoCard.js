import React from 'react';
import PropTypes from 'prop-types';

const BasicInfoCard = ({ ciudad, direccion, logo, onUpdateFotoClick }) => {
  let style = {};

  if (onUpdateFotoClick) {
    style = { cursor: 'pointer' };
  }

  return (
    <div className="card">
      <div className="card-body">
        <Avatar image={logo} size="120px" />
        <p className="my-1 text-center">
          <a onClick={onUpdateFotoClick} style={style}>
            Update photo
          </a>
        </p>
        <p className="my-2 text-center">
          {4.5} &nbsp;
          <Rating
            initialRating={4.5}
            fullSymbol={<i className="fas fa-star" />}
            emptySymbol={<i className="far fa-star" />}
          />
        </p>
        <hr className="w-100" />
        <p className="text-muted">
          <span className="mx-1">
            <i className="fas fa-home"></i>
          </span>
          <a href="javascript:;">{ciudad}</a>
        </p>
        <p className="text-muted">
          <span className="mx-1">
            <i className="fas fa-map-marker"></i>
          </span>
          {direccion}
        </p>
      </div>
    </div>
  );
};

BasicInfoCard.propTypes = {
  ciudad: PropTypes.string,
  direccion: PropTypes.string,
  logo: PropTypes.string,
  onUpdateFotoClick: PropTypes.func,
};

export default BasicInfoCard;
