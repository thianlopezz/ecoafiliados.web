import React from 'react';
import PropTypes from 'prop-types';

const TitleDescriptionCard = ({ icon, title, description, onClick }) => {
  let style;
  if (onClick) {
    style = { cursor: 'pointer' };
  }

  return (
    <div
      onClick={onClick}
      style={style}
      className="card border border-dark rounded"
    >
      <div className="card-body p-4">
        {icon && (
          <h2>
            <i className={icon} />
          </h2>
        )}
        <h6 className="font-weight-bold">{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
};

TitleDescriptionCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

export default TitleDescriptionCard;
