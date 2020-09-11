import React from 'react';
import PropTypes from 'prop-types';

const ImageFit = ({ image, size }) => {
  const style = {
    backgroundImage: `url('${image}')`,
    width: size || '100%',
    height: size || '100%',
    backgroundSize: 'cover',
    borderRadius: '0.25rem',
    backgroundPosition: 'center',
  };

  return <div style={style} />;
};

ImageFit.propTypes = {
  image: PropTypes.string,
  width: PropTypes.string,
};

export default ImageFit;
