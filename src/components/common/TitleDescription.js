import React from 'react';
import PropTypes from 'prop-types';

const TitleDescription = ({ icon, title, description }) => {
  return (
    <div>
      {icon && <i className={icon} />}
      <h6 className="mt-2 mb-0 font-weight-bold">{title}</h6>
      <p className="p-x-sm-0">{description}</p>
    </div>
  );
};

TitleDescription.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default TitleDescription;
