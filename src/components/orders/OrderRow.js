import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../common/inputs/Button';

const OrderRow = ({
  idOrden,
  idWoo,
  idComercio,
  nombre,
  nombreEcobox,
  totalOrden,
  status,
  estado,
  feCreacion,
  onDetail,
  onChangeOrderState,
}) => {
  return (
    <tr>
      <th>{`${idOrden} / ${idWoo}`}</th>
      <td>{nombre}</td>
      {nombreEcobox ? <td>{nombreEcobox}</td> : <td>{'-'}</td>}
      {estado == 'pending' ? (
        <td style={{ color: '#FF4343' }}>{status}</td>
      ) : (
        <td>{status}</td>
      )}
      <td>{moment(feCreacion).format('DD[/]MM[/]YYYY hh:mm A')}</td>
      <td>${(+totalOrden).toFixed(2)}</td>
      <td className="text-center">
        <Button
          type="button"
          onClick={() => onDetail(idOrden)}
          variant="contained"
          color="primary"
        >
          Detalle
        </Button>{' '}
      </td>
    </tr>
  );
};

OrderRow.propTypes = {
  idCompra: PropTypes.number,
  pasajero: PropTypes.string,
  cupos: PropTypes.number,
  estado: PropTypes.string,
  feCreacion: PropTypes.string,
  total: PropTypes.number,
  ganancia: PropTypes.number,
};

export default OrderRow;
