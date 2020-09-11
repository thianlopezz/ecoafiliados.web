import React from 'react';
import PropTypes from 'prop-types';

import DummyCards from '../common/cards/DummyCards';
import OrderDetailRow from './OrderDetailRow';

const OrderDetailTable = ({ productos, totalOrden, loading }) => {
  if (!productos) {
    productos = [];
  }

  let ToShow;

  if (loading) {
    // ON LOADING
    ToShow = (
      <tr>
        <td colSpan="6" className="text-center px-0">
          <DummyCards cols="col-sm-12 px-0" size={1} disablePhoto />
        </td>
      </tr>
    );
  } else if (productos.length === 0) {
    // NO EXISTEN RESERVACIONES
    ToShow = (
      <tr>
        <td colSpan="6" className="text-center">
          <h5>
            <i className="far fa-sticky-note" />
          </h5>
          <p>No existen productos para mostrar.</p>
        </td>
      </tr>
    );
  } else {
    ToShow = productos.map((producto, index) => {
      return (
        <>
          <OrderDetailRow key={producto.name + index} {...producto} />
          {index + 1 == productos.length && (
            <tr>
              <td colSpan="3">Total</td>
              <td>{Number(totalOrden).toFixed(2)}</td>
            </tr>
          )}
        </>
      );
    });
  }

  return (
    <div class="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{ToShow}</tbody>
      </table>
    </div>
  );
};

OrderDetailTable.propTypes = {
  reservations: PropTypes.array,
  onDetail: PropTypes.func,
  loading: PropTypes.bool,
};

export default OrderDetailTable;
