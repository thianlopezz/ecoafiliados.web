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
          <h1>Tarjeta de control de tránsito TCT</h1>
          <p>
            Antes de hacer check-in en la aerolínea (Vía on-line no se permite
            hacer check-in), busca en los aeropuerto de Guayaquil o Quito, las
            oficinas de migración de Galápagos, para que te revisen las maletas
            y te ponen un seguro; luego de eso pasas a la ventanilla de
            Migración para comprar la tarjeta de control de tránsito que tiene
            un costo de USD 20. El valor de la tarjeta es el mismo para todas
            las personas ecuatorianos o extranjeros e incluso si son menores de
            edad. Ahora sí, ve hacer el check-in a la ventanilla de la
            aerolínea.
          </p>
        </Section>
        <Section>
          <h1>Cobro del tributo de entrada a las áreas protegidas</h1>
          <p>
            La tasa de ingreso de turista se establece con el objetivo de
            financiar actividades de conservación y manejo del área protegida a
            cargo de la DPNG, así como las actividades de desarrollo sostenible
            ejecutadas por los Gobiernos Autónomos Descentralizados Municipales
            en cada uno de los cantones de la provincia. La Dirección del Parque
            Nacional Galápagos es la entidad encargada de recaudar el tributo
            por ingreso de turistas a Galápagos, control de los depósitos
            diarios, liquidaciones diarias, administración de los kardex de
            especies valoradas por cada una de las especies, realizar la
            liquidación mensual y la distribución del tributo a cada uno de los
            beneficiarios de Conformidad con la Ley Orgánica para el Desarrollo
            Sustentable de la Provincia de Galápagos y su Reglamento de
            aplicación.
          </p>
          <table className="table">
            <tbody>
              <tr>
                <td width="80%">
                  Turistas extranjeros no residentes en el Ecuador mayores de 12
                  años
                </td>
                <td>US $100</td>
              </tr>
              <tr>
                <td width="80%">
                  Turistas extranjeros no residentes en el Ecuador menores de 12
                  años
                </td>
                <td>US $50</td>
              </tr>
              <tr>
                <td width="80%">
                  Turistas extranjeros no residentes en el Ecuador, mayores de
                  12 años, nacionales de uno de los países pertenecientes a la
                  Comunidad Andina de Naciones o al Mercosur *
                </td>
                <td>US $50</td>
              </tr>
              <tr>
                <td width="80%">
                  Turistas extranjeros no residentes en el Ecuador menores de 12
                  años, nacionales de uno de los países pertenecientes a la
                  Comunidad Andina de Naciones o al Mercosur *
                </td>
                <td>US $25</td>
              </tr>
              <tr>
                <td width="80%">
                  Turistas nacionales o extranjeros residentes en el Ecuador,
                  mayores de 12 años
                </td>
                <td>US $6</td>
              </tr>
              <tr>
                <td width="80%">
                  Turistas nacionales o extranjeros residentes en el Ecuador,
                  menores de 12 años
                </td>
                <td>US $3</td>
              </tr>
              <tr>
                <td width="80%">
                  Turistas, estudiantes extranjeros no residentes en el Ecuador
                  que se encuentren matriculados en instituciones educativas
                  nacionales
                </td>
                <td>US $25</td>
              </tr>
              <tr>
                <td>
                  * Estados Partes del MESCOSUR:
                  <strong>
                    Argentina, Brasil, Paraguay, Uruguay, Venezuela.
                  </strong>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  * Estados Miembros de la CAN:
                  <strong>Bolivia, Colombia, Ecuador, Perú.</strong>
                </td>
                <td></td>
              </tr>
              <tr>
                <td valign="top">
                  <img
                    className="alignnone size-full wp-image-2442"
                    src="http://cucuvesuites.com/wp-content/uploads/2015/01/pdf.png"
                    alt="pdf"
                    width="20"
                    height="22"
                  />
                  >
                  <strong>
                    <a
                      href="http://www.galapagospark.org/documentos/resoluciones/2009/Resolucion_0059_07-10-09_Instructivo_manejo_de_tributo.pdf"
                      target="_blank"
                    >
                      Resolución DPNG No. 0059
                    </a>
                  </strong>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
