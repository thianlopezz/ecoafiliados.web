import React from 'react';
import PropTypes from 'prop-types';

import DummyCards from '../common/cards/DummyCards';
import OrderRow from './OrderRow';

const OrdersTable = ({ orders, onDetail, loading }) => {
  if (!orders) {
    orders = [];
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
  } else if (orders.length === 0) {
    // NO EXISTEN RESERVACIONES
    ToShow = (
      <tr>
        <td colSpan="6" className="text-center">
          <h5>
            <i className="far fa-sticky-note" />
          </h5>
          <p>No existen pedidos para mostrar.</p>
        </td>
      </tr>
    );
  } else {
    ToShow = orders.map((order, index) => {
      return <OrderRow key={order.idOrden} {...order} onDetail={onDetail} />;
    });
  }

  return (
    <div class="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Ecobox</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{ToShow}</tbody>
      </table>
    </div>
  );
};

OrdersTable.propTypes = {
  reservations: PropTypes.array,
  onDetail: PropTypes.func,
  loading: PropTypes.bool,
};

export default OrdersTable;
