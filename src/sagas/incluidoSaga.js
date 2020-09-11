import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getIncluidos = () => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/incluido`, { headers });
};

export function* getIncluidosSaga() {
  try {
    const response = yield call(getIncluidos);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'INCLUIDOS_GET_SUCCESS', incluidos: data.incluidos });
    } else {
      console.log(data.error);

      yield put({
        type: 'INCLUIDOS_GET_ERROR',
        error: data.error,
        message: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'INCLUIDOS_GET_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
