import React from 'react';
import PropTypes from 'prop-types';

const EntityFrame = ({ title, button: Button, children }) => {
  let content = '';

  if (title && Button) {
    content = (
      <div className="d-flex" style={{ marginBottom: '3rem' }}>
        <h3>{title}</h3>
        {Button}
      </div>
    );
  } else if (title) {
    content = <h2 className="align-items-center mt-4 mb-1">{title}</h2>;
  }

  return (
    <div>
      {content}
      {children}
    </div>
  );
};

EntityFrame.propTypes = {
  title: PropTypes.string,
};

export default EntityFrame;
