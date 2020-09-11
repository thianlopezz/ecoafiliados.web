import React from 'react';
import PropTypes from 'prop-types';

const VerTodos = ({ text, goAction }) => {
  return (
    <div className="row col-12 mt-4 mb-2">
      <a
        className="my-auto text-primary"
        style={{ cursor: 'pointer' }}
        onClick={goAction}
      >
        {text + ' '}
        <i className="fas fa-chevron-right" />
      </a>
    </div>
  );
};

VerTodos.propTypes = {
  text: PropTypes.string,
  goAction: PropTypes.func,
};

export default VerTodos;
