import React from 'react';
import PropTypes from 'prop-types';
import Button from '../inputs/Button';

const sectionsStyle = {
  marginBottom: '3em',
  marginTop: '3em',
};

const Section = ({
  children,
  className,
  style,
  title,
  description,
  button: Button,
}) => {
  return (
    <section className={className} style={style || sectionsStyle}>
      <div className="d-flex">
        {title && <h2>{title}</h2>}
        {Button}
      </div>

      {description && <p>{description}</p>}

      <div style={sectionsStyle}>{children}</div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
