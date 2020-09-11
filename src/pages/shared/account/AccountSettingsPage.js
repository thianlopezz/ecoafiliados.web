import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Section from '../../../components/common/wrappers/Section';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';

const AccountSettingsPage = ({ history, usuario }) => {
  return (
    <div className="container" style={{ marginTop: '4rem' }}>
      <Section className="mt-4">
        <h2>Configuración de cuenta</h2>
        <p>
          <strong>
            {usuario.nombre} {usuario.apellido}
          </strong>
          , {usuario.correo} ·{' '}
          {/* <Link to={'/profile/' + usuario.idUsuario}>Go to profile</Link> */}
        </p>
      </Section>
      <Section>
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-4">
            <TitleDescriptionCard
              onClick={() => history.push('/account/personal-info')}
              icon="far fa-address-card"
              title="Información personal"
              description="Provee tu información personal y como se te puede contactar."
            />
          </div>
          <div className="col-sm-12 col-md-4 mb-4">
            <TitleDescriptionCard
              onClick={() => history.push('/account/login-security')}
              icon="fas fa-key"
              title="Inicio de sesión y seguradad"
              description="Actualiza tu contraseña y asegura tu cuenta."
            />
          </div>
          {/* <div className="col-sm-12 col-md-4 mb-4">
            <TitleDescriptionCard
              onClick={() => history.push('/account/payment')}
              icon="far fa-money-bill-alt"
              title="Payments & payouts"
              description="Review payments, payouts, coupons, gift cards, and taxes"
            />
          </div> */}
        </div>
      </Section>
      <Section className="my-4">
        <h2>Agency</h2>
        {/* <p>Become an agency partner</p> */}
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-4">
            {usuario.agencia && usuario.agencia.idPlanner ? (
              <TitleDescriptionCard
                onClick={() => history.push('/account/agency-info')}
                icon="far fa-address-card"
                title="Información de tu cuenta de agencia"
                description="Mira y actualiza los detalles de tu cuenta de agencia."
              />
            ) : (
              <TitleDescriptionCard
                onClick={() => history.push('/account/become-provider')}
                icon="far fa-address-card"
                title="Become an agency partner"
                description="You can apply with your agency to offer touristic plans"
              />
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = ({ loginState }, props) => {
  const { usuario } = loginState;

  return {
    usuario,
  };
};

AccountSettingsPage.propTypes = {};

export default connect(
  mapStateToProps,
  null
)(AccountSettingsPage);
