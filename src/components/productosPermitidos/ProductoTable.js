import React from 'react';
import PropTypes from 'prop-types';

import DummyCards from '../common/cards/DummyCards';
import ProductoRow from './ProductoRow';

const ProductoTable = ({ productos, loading }) => {
  if (!productos) {
    productos = [];
  }

  let ToShow;

  if (loading) {
    // ON LOADING
    ToShow = <DummyCards cols={3} />;
  } else if (productos.length === 0) {
    // NO EXISTEN RESERVACIONES
    ToShow = (
      <div className="card w-100">
        <div className="card-body">
          <h1 className="text-center">
            <i className="far fa-sticky-note" />
          </h1>
          <p className="text-center">No existen productos.</p>
        </div>
      </div>
    );
  } else {
    ToShow = productos.map((producto, index) => {
      return <ProductoRow key={producto.idProducto} {...producto} />;
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Code</th>
          <th scope="col">Product name</th>
          <th scope="col" colSpan="3">
            Requeriment
          </th>
        </tr>
      </thead>
      <tbody>{ToShow}</tbody>
    </table>
  );
};

ProductoTable.propTypes = {
  reservations: PropTypes.array,
  onDetail: PropTypes.func,
  loading: PropTypes.bool,
};

export default ProductoTable;
