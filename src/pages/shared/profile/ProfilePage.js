import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import ProfileInfoForm from '../../../components/profile/ProfileInfoForm';

const ProfilePage = ({
  match,
  loadUsuario,
  loadPaises,
  usuarioOldValue,
  usuarioChange,
  usuario,
  loadingList,
  loading,
  paisesOption,
  saveUsuario,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUsuario(match.params.idUsuario);
    loadPaises();
  }, []);

  const onCancelSave = () => {
    usuarioChange(usuarioOldValue);
    setShowForm(false);
  };

  return (
    <div className="container page">
      <Section>
        <div className="row mt-4">
          <div className="col-md-4 col-sm-12">
            <div className="card">
              <div className="card-body">
                {usuario.foto ? (
                  <Avatar src={usuario.foto} style={{ width: '120px' }} />
                ) : (
                  usuario.nombre && (
                    <Avatar
                      style={{ width: '120px', height: '120px' }}
                      className="mx-auto"
                    >{`${usuario.nombre[0].toUpperCase() +
                      ' ' +
                      usuario.apellido[0].toUpperCase()}`}</Avatar>
                  )
                )}

                <p className="my-1 text-center">
                  <a href="javascript:;">Update photo</a>
                </p>
                <hr className="w-100" />
                {usuario.pais && (
                  <p className="text-muted">
                    <span className="mx-1">
                      <i className="fas fa-home"></i>
                    </span>
                    <a href="javascript:;">{usuario.pais}</a>
                  </p>
                )}
                {usuario.feNacimiento && (
                  <p className="text-muted">
                    <span className="mx-1">
                      <i className="fas fa-birthday-cake"></i>
                    </span>
                    <a href="javascript:;">
                      {moment(usuario.feNacimiento).format('DD MMM YYYY')}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            {usuario.nombre && (
              <h1 className="mb-0">
                {usuario.nombre + ' ' + usuario.apellido}
              </h1>
            )}
            <div className="d-flex">
              <div className="p-2">
                <p className="text-muted">
                  Joined on{' '}
                  {usuario.feCreacion &&
                    moment(usuario.feCreacion).format('YYYY')}
                </p>
              </div>
              <div className="p-2">
                <a
                  href="javascript:;"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowForm(true)}
                >
                  Edit profile
                </a>
              </div>
            </div>
            {!showForm && <p>{usuario.about}</p>}
            {showForm && (
              <ProfileInfoForm
                loading={loading}
                usuario={usuario}
                paisesOption={paisesOption}
                onUsuarioChange={usuarioChange}
                onSubmit={usuario => {
                  saveUsuario(
                    {
                      idUsuario: usuario.idUsuario,
                      about: usuario.about,
                      idPais: usuario.idPais,
                    },
                    () => setShowForm(false)
                  );
                }}
                onCancel={onCancelSave}
              />
            )}
            <hr className="w-100" />
            <h2>Fabs</h2>
          </div>
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = ({ usuarioState, paisState }, props) => {
  const { loading, loadingList, usuario, usuarioOldValue } = usuarioState;
  const { paises } = paisState;

  let paisesOption = paises.map(pais => {
    return { value: pais.idPais, text: pais.pais };
  });

  return {
    loadingList,
    loading,
    usuario,
    usuarioOldValue,
    paisesOption,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUsuario: idUsuario =>
      dispatch({ type: 'USUARIO_GET_BY_ID', idUsuario }),
    loadPaises: () => dispatch({ type: 'PAISES_GET' }),
    usuarioChange: usuario => dispatch({ type: 'USUARIO_CHANGE', usuario }),
    saveUsuario: (usuario, onSuccess) =>
      dispatch({ type: 'USUARIO_SAVE_PROFILE_INFO', usuario, onSuccess }),
  };
};

ProfilePage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
