import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getCiudadById = idCiudad => {
  return axios.get(`${proxyConfig.url}/api/ciudad/${idCiudad}`);
};

const getCiudades = () => {
  return axios.get(`${proxyConfig.url}/api/ciudad`);
};

export function* getCiudadesSaga() {
  try {
    const response = yield call(getCiudades);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'CIUDADES_GET_SUCCESS', ciudades: data.ciudades });
    } else {
      console.log(data.error);

      yield put({
        type: 'CIUDADES_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'CIUDADES_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getCiudadByIdSaga(action) {
  try {
    const response = yield call(getCiudadById, action.idCiudad);

    const data = response.data;

    if (data.success) {
      yield put({
        type: 'CIUDAD_GET_BY_ID_SUCCESS',
        ciudad: data.ciudad || {},
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'CIUDAD_GET_BY_ID_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'CIUDAD_GET_BY_ID_ERROR',
      error,
      mensaje: error.message,
    });
  }
}
