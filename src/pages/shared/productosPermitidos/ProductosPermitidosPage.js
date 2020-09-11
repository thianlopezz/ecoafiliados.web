import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlanHeader from '../../../components/plan/PlanHeader';
import Section from '../../../components/common/wrappers/Section';
import WhatsInclude from '../../../components/plan/WhatsInclude';
import YourAgency from '../../../components/plan/YourAgency';
import TravelerReviews from '../../../components/plan/TravelerReviews';
import Availability from '../../../components/plan/Availability';
import IncluidoList from '../../../components/incluido/IncluidoList';
import ProductoTable from '../../../components/productosPermitidos/ProductoTable';

const productos = [
  {
    codigo: 1,
    producto: 'Aceites vegetales',
    req1: 'N.G.',
    req2: '6.',
    req3: '7.',
  },
];

class ProductosPermitidosPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    // const {
    //   ciudades,
    //   planes,
    //   loadingPlanes,
    //   lugares,
    //   loadingLugares,
    // } = this.props;

    return (
      <div className="container page mt-4">
        <Section>
          <h1>
            LISTA DE PRODUCTOS SUBPRODUCTOS Y DERIVADOS DE ORIGEN VEGETAL Y
            ANIMAL
          </h1>
          <p>
            Esta lista fue elaborada participativamente en septiembre de 1999,
            ha sido revisada y actualizada sobre la base de análisis de riesgos
            y de las Resoluciones, 449 y 451, de la Comunidad Andina de Naciones
            y el RCTEI.
          </p>
          <p>
            Fue aprobada por el Directorio de la ABG mediante Resolución No.
            D-ABG-004-07-2013.
          </p>
          <p>
            Los productos, subproductos y derivados de origen animal y vegetal
            que se transporten hacia la provincia de Galápagos, deben cumplir
            con las normas generales y requisitos específicos establecidos.
          </p>
        </Section>
        <Section>
          <div className="row mt-4">
            <div className="col-md-4 col-sm-12">
              <h2>Search</h2>
            </div>
            <div className="col-md-8 col-sm-12">
              <input className="form-control"></input>
            </div>
          </div>
        </Section>
        <Section>
          <div className="row mt-4">
            <div className="col-md-4 col-sm-12">
              <h2>Permitted products</h2>
            </div>
            <div className="col-md-8 col-sm-12">
              <ProductoTable productos={productos}></ProductoTable>
            </div>
          </div>
        </Section>
        <Section>
          <div className="row mt-4">
            <div className="col-md-4 col-sm-12">
              <h2>Restricted products</h2>
            </div>
            <div className="col-md-8 col-sm-12">
              <ProductoTable productos={productos}></ProductoTable>
            </div>
          </div>
        </Section>
        <Section>
          <div className="row mt-4">
            <div className="col-md-4 col-sm-12">
              <h2>No permitted products</h2>
            </div>
            <div className="col-md-8 col-sm-12">
              <ProductoTable productos={productos}></ProductoTable>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = ({}, props) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

ProductosPermitidosPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductosPermitidosPage);
