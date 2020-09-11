import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../common/inputs/Button';

const ReservationRow = ({
  idCompra,
  pasajero,
  cupos,
  estado,
  estadoFormat,
  feCreacion,
  total,
  ganancia,
  onDetail,
}) => {
  return (
    <tr>
      <th>{estadoFormat}</th>
      <td>
        {pasajero}
        <br />
        {cupos} pasajero(s)
      </td>
      <td>
        {moment(feCreacion)
          .utc()
          .format('ddd DD, MMM YYYY')}
      </td>
      <td>${total}</td>
      <td>${ganancia}</td>
      <td className="text-center">
        <Button
          type="button"
          onClick={() => onDetail(idCompra)}
          variant="contained"
          color="primary"
        >
          Detalle
        </Button>
      </td>
    </tr>
  );
};

ReservationRow.propTypes = {
  idCompra: PropTypes.number,
  pasajero: PropTypes.string,
  cupos: PropTypes.number,
  estado: PropTypes.string,
  feCreacion: PropTypes.string,
  total: PropTypes.number,
  ganancia: PropTypes.number,
};

export default ReservationRow;
