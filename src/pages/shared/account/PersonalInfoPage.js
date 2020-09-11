import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';
import Button from '../../../components/common/inputs/Button';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import PersonalInfoForm from '../../../components/usuario/PersonalInfoForm';
import PersonalInfo from '../../../components/usuario/PersonalInfo';

const PersonalInfoPage = ({
  history,
  usuarioSesion,
  usuario,
  usuarioChange,
  saveUsuario,
  loading,
}) => {
  let [isBasicFormToEdit, setBasicFormToEdit] = useState(false);

  useEffect(() => {
    usuarioChange(usuarioSesion);
  }, []);

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
          <Typography color="textPrimary">Información personal</Typography>
        </Breadcrumbs>
        <h2>Información personal</h2>
      </Section>
      <Section>
        <div className="row mt-4">
          <div className="col-md-8 col-sm-12">
            <div className="w-100">
              <div className="d-flex mb-4">
                <h3>Información</h3>
                {!isBasicFormToEdit ? (
                  <Button
                    color="primary"
                    className="ml-auto"
                    onClick={() => setBasicFormToEdit(true)}
                  >
                    Editar
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="ml-auto"
                    onClick={() => setBasicFormToEdit(false)}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
              <Section>
                {!isBasicFormToEdit ? (
                  <PersonalInfo usuario={usuario} />
                ) : (
                  <PersonalInfoForm
                    loading={loading}
                    usuario={usuario}
                    onUsuarioChange={usuarioChange}
                    onSubmit={usuario => {
                      saveUsuario(
                        {
                          idUsuario: usuario.idUsuario,
                          nombre: usuario.nombre,
                          apellido: usuario.apellido,
                          contacto: usuario.contacto,
                          genero: usuario.genero,
                          feNacimiento: usuario.feNacimiento,
                        },
                        () => setBasicFormToEdit(false)
                      );
                    }}
                  />
                )}
              </Section>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <TitleDescriptionCard
              icon="fas fa-info"
              title="Que información tuya compartes"
              description="Provee la información que deseas compartir con otros"
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = ({ loginState, usuarioState }, props) => {
  const { usuario: usuarioSesion } = loginState;
  const { loading, usuario } = usuarioState;

  return {
    usuarioSesion,
    usuario,
    loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    usuarioChange: usuario => dispatch({ type: 'USUARIO_CHANGE', usuario }),
    saveUsuario: (usuario, onSuccess) =>
      dispatch({ type: 'USUARIO_SAVE_PERSONAL_INFO', usuario, onSuccess }),
  };
};

PersonalInfoPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfoPage);
