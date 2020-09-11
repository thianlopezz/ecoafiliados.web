import React from 'react';
import { palette, CSS_HELPERS_REACT } from '../../theme';

const Footer = () => {
  return (
    <div
      style={{
        flexShrink: '0',
        height: '9vh',
        backgroundColor: palette.primary.main,

        ...CSS_HELPERS_REACT.CENTER_VERTICAL,
      }}
    >
      <h6>Moder footer make a cool footer..</h6>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
