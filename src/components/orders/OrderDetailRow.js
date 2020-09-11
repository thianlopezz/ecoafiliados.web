import React from 'react';
import PropTypes from 'prop-types';

const OrderDetailRow = ({ name, quantity, subtotal, total }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{subtotal}</td>
      <td>{total}</td>
    </tr>
  );
};

OrderDetailRow.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.string,
  subtotal: PropTypes.string,
  total: PropTypes.string,
};

export default OrderDetailRow;
