import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';
import Button from '../../../components/common/inputs/Button';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import CambiarContrasenaForm from '../../../components/account/CambiarContrasenaForm';
import moment from 'moment';

const LoginAndSecurityPage = ({
  history,
  loading,
  usuario,
  loadingList,
  cambiarContrasena,
}) => {
  let [isPasswordFormToEdit, setPasswordFormToEdit] = useState(false);

  return (
    <div className="container" style={{ marginTop: '4rem' }}>
      <Section className="mt-4">
        <Breadcrumbs className="mb-2" separator=" › " aria-label="breadcrumb">
          <Link
            color="inherit"
            href="javascript:;"
            onClick={() => history.push('/account/settings')}
          >
            Configuración de cuenta
          </Link>
          <Typography color="textPrimary">
            Inicio de sesión y seguridad
          </Typography>
        </Breadcrumbs>
        <h2>Inicio de sesión y seguridad</h2>
      </Section>
      <Section>
        <div className="row mt-4">
          <div className="col-md-8 col-sm-12">
            <div className="w-100">
              <h3 className="mb-4">Login</h3>
              <div className="d-flex my-2">
                <h5>Contraseña</h5>
                {!isPasswordFormToEdit ? (
                  <Button
                    color="primary"
                    className="ml-auto"
                    onClick={() => setPasswordFormToEdit(true)}
                  >
                    Actualizar
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="ml-auto"
                    onClick={() => setPasswordFormToEdit(false)}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
              {!isPasswordFormToEdit ? (
                <p>
                  Última vez actualizado{' '}
                  {moment(usuario.feUpdatePassword).format(
                    'ddd[,] DD MMM YYYY'
                  )}
                </p>
              ) : (
                <CambiarContrasenaForm
                  loading={loading}
                  onSubmit={doublePassword =>
                    cambiarContrasena(
                      {
                        ...doublePassword,
                        idUsuario: usuario.idUsuario,
                      },
                      () => setPasswordFormToEdit(false)
                    )
                  }
                />
              )}
            </div>
            <hr className="w-100"></hr>
          </div>
          {!loadingList && (
            <div className="col-md-4 col-sm-12">
              <TitleDescriptionCard
                icon="fas fa-key"
                title="Asegura tu cuenta"
                description="Cambia la contraseña de tu cuenta cuando creas necesario."
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = ({ loginState, usuarioState }, props) => {
  const { usuario } = loginState;
  const { loading } = usuarioState;

  return {
    loading,
    usuario,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cambiarContrasena: (usuarioContrasena, onSuccess) =>
      dispatch({
        type: 'USUARIO_CHANGE_PASSWORD',
        usuarioContrasena,
        onSuccess,
      }),
  };
};

LoginAndSecurityPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAndSecurityPage);
