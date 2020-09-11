import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TravelerRow = ({
  idReserva,
  nombre,
  apellido,
  pais,
  identificacion,
  estado,
  feCreacion,
  onDetail,
}) => {
  return (
    <tr>
      <td>{`${nombre} ${apellido}`}</td>
      <td>{identificacion}</td>
      <td>{pais}</td>
      <td>
        {moment(feCreacion)
          .utc()
          .format('ddd DD, MMM YYYY')}
      </td>
      {/* <td className="text-center">
        <button
          type="button"
          onClick={onDetail}
          className="btn btn-secondary ml-auto"
        >
          Detalle
        </button>
      </td> */}
    </tr>
  );
};

TravelerRow.propTypes = {
  idReserva: PropTypes.number,
  nombre: PropTypes.string,
  apellido: PropTypes.string,
  estado: PropTypes.string,
  feCreacion: PropTypes.string,
};

export default TravelerRow;
