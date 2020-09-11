import React from 'react';
import PropTypes from 'prop-types';

import DummyCards from '../common/cards/DummyCards';
import TravelerRow from './TravelerRow';

const TravelerTable = ({ travelers, onDetail, loading }) => {
  if (!travelers) {
    travelers = [];
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
  } else if (travelers.length === 0) {
    // NO EXISTEN RESERVACIONES
    ToShow = (
      <tr>
        <td colSpan="3" className="text-center">
          <h5>
            <i className="far fa-sticky-note" />
          </h5>
          <p>No existen pasajeros para mostrar.</p>
        </td>
      </tr>
    );
  } else {
    ToShow = travelers.map((traveler, index) => {
      return (
        <TravelerRow
          key={traveler.idReservation}
          {...traveler}
          onDetail={onDetail}
        />
      );
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Pasajero</th>
          <th scope="col">Identificación</th>
          <th scope="col">País</th>
          <th scope="col">Reservado</th>
          {/* <th scope="col">Total</th>
          <th scope="col">Ganancias</th>
          <th scope="col"></th> */}
        </tr>
      </thead>
      <tbody>{ToShow}</tbody>
    </table>
  );
};

TravelerTable.propTypes = {
  travelers: PropTypes.array,
  onDetail: PropTypes.func,
  loading: PropTypes.bool,
};

export default TravelerTable;
