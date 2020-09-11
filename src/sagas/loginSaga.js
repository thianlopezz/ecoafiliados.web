import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { logOut } from '../helpers/sesion';
import { proxyConfig } from '../helpers/proxyConfig';

const login = login => {
  return axios.post(`${proxyConfig.url}/login/afiliado`, {
    ...login,
    // password: sha1(login.password),
  });
};

const setSession = (usuario, token) => {
  localStorage.setItem('usuario', JSON.stringify(usuario));
  localStorage.setItem('token', token);
};

export function* loginSaga(action) {
  try {
    const response = yield call(login, action.login);
    const data = response.data;

    if (data.success) {
      setSession(data.usuario, data.authToken);
      yield put({ type: 'LOGIN_SUCCESS', usuario: data.usuario });
      if (action.onSuccess) action.onSuccess(data.usuario.idComercio);
      yield put({ type: 'SHOW_LOGIN_MODAL', show: false });
    } else {
      yield put({
        type: 'LOGIN_ERROR',
        error: data.error,
        message: data.mensaje,
      });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    console.log(error);
    // handleAxiosError(error);

    yield put({
      type: 'LOGIN_ERROR',
      error,
      mensaje: error.message,
    });

    yield put({
      type: 'NOTIFICATION_SHOW',
      notification: {
        type: 'error',
        message: 'Something happened! :(',
      },
    });
  }
}

export function* logoutSagas(action) {
  // window.location = '/login';
  logOut();
}
