import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getSalidaPlan = (idSalida, idPlan) => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/salida/${idSalida}/${idPlan}`, {
    headers,
  });
};

export function* getSalidaPlanSaga(action) {
  try {
    const response = yield call(getSalidaPlan, action.idSalida, action.idPlan);
    const data = response.data;

    if (data.success) {
      let { salida, plan } = data;

      yield put({
        type: 'SALIDA_GET_SUCCESS',
        salida,
      });
      yield put({
        type: 'PLAN_GET_BY_ID_SUCCESS',
        plan,
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'SALIDA_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'SALIDA_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
