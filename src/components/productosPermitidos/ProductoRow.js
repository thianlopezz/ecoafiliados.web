import React from 'react';
import PropTypes from 'prop-types';

const ProductoRow = ({ idProducto, codigo, producto, req1, req2, req3 }) => {
  return (
    <tr>
      <th>{codigo}</th>
      <td>{producto}</td>
      <td>{req1}</td>
      <td>{req2}</td>
      <td>{req3}</td>
    </tr>
  );
};

ProductoRow.propTypes = {
  idProducto: PropTypes.number,
  producto: PropTypes.string,
  req1: PropTypes.string,
  req2: PropTypes.string,
  req3: PropTypes.string,
};

export default ProductoRow;
