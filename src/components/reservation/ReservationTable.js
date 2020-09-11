import React from 'react';
import PropTypes from 'prop-types';

import DummyCards from '../common/cards/DummyCards';
import ReservationRow from './ReservationRow';

const ReservationTable = ({ reservations, onDetail, loading }) => {
  if (!reservations) {
    reservations = [];
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
  } else if (reservations.length === 0) {
    // NO EXISTEN RESERVACIONES
    ToShow = (
      <tr>
        <td colSpan="6" className="text-center">
          <h5>
            <i className="far fa-sticky-note" />
          </h5>
          <p>No existen reservas para mostrar.</p>
        </td>
      </tr>
    );
  } else {
    ToShow = reservations.map((reservation, index) => {
      return (
        <ReservationRow
          key={reservation.idCompra}
          {...reservation}
          onDetail={onDetail}
        />
      );
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Estado</th>
          <th scope="col">Pasajero</th>
          <th scope="col">Reservado</th>
          <th scope="col">Total</th>
          <th scope="col">Ganancias</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{ToShow}</tbody>
    </table>
  );
};

ReservationTable.propTypes = {
  reservations: PropTypes.array,
  onDetail: PropTypes.func,
  loading: PropTypes.bool,
};

export default ReservationTable;
