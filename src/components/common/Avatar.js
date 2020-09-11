import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ image, size }) => {
  const style = {
    backgroundImage: `url('${image}')`,
    width: size || '50px',
    height: size || '50px',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    borderRadius: '50%',
    margin: 'auto',
  };

  return <div style={style} />;
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.string,
};

export default Avatar;
