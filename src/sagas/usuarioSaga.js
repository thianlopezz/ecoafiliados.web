import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getUsuarioById = idUsuario => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/usuario/${idUsuario}`, { headers });
};

const saveProfileInfo = usuario => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/usuario/profile-info`, usuario, {
    headers,
  });
};

const savePersonalInfo = usuario => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/usuario/personal-info`, usuario, {
    headers,
  });
};

const cambiarContrasena = usuarioContrasena => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(
    `${proxyConfig.url}/api/usuario/contrasena`,
    usuarioContrasena,
    { headers }
  );
};

export function* getUsuarioByIdSaga(action) {
  try {
    const response = yield call(getUsuarioById, action.idUsuario);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'USUARIO_GET_BY_ID_SUCCESS', usuario: data.usuario });
    } else {
      console.log(data.error);

      yield put({
        type: 'USUARIO_GET_BY_ID_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'USUARIO_GET_BY_ID_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* saveProfileInfoSaga(action) {
  try {
    const response = yield call(saveProfileInfo, action.usuario);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'USUARIO_SAVE_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'USUARIO_SAVE_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    console.log(error);
    // handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'Something happened! :(',
    });

    yield put({
      type: 'USUARIO_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* savePersonalInfoSaga(action) {
  try {
    const response = yield call(savePersonalInfo, action.usuario);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'USUARIO_SAVE_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      // ACTUALIZA INFORMACION DE LA SESION
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      usuario = { ...usuario, ...action.usuario };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      yield put({ type: 'LOGIN_SUCCESS', usuario });

      action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'USUARIO_SAVE_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    console.log(error);
    // handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'Something happened! :(',
    });

    yield put({
      type: 'USUARIO_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* cambiarContrasenaSaga(action) {
  try {
    const response = yield call(cambiarContrasena, action.usuarioContrasena);
    const data = response.data;

    if (data.success) {
      // ACTUALIZAO LOCAL STORAGE CON NUEVA FECHA DE UPDATEPASSWORD
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      usuario.feUpdatePassword = data.feUpdatePassword;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      yield put({ type: 'LOGIN_SUCCESS', usuario });

      yield put({ type: 'USUARIO_CHANGE_PASSWORD_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      if (action.onSuccess) action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'USUARIO_CHANGE_PASSWORD_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    console.log(error);
    // handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'Something happened! :(',
    });

    yield put({
      type: 'USUARIO_SAVE_ERROR',
      error,
      mensaje: error.message,
    });
  }
}
