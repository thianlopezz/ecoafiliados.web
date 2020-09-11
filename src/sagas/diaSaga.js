import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getDias = () => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/dia`, { headers });
};

export function* getDiasSaga() {
  try {
    const response = yield call(getDias);
    const data = response.data;

    if (data.success) {
      yield put({
        type: 'DIAS_GET_SUCCESS',
        dias: data.dias,
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'DIAS_GET_ERROR',
        error: data.error,
        message: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'DIAS_GET_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
