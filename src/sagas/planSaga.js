import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getPlanes = () => {
  return axios.get(`${proxyConfig.url}/api/planes`);
};

const getPlanesByPlanner = idPlanner => {
  return axios.get(`${proxyConfig.url}/api/planes/planner/${idPlanner}`);
};

const getPlanesByCiudad = idCiudad => {
  return axios.get(`${proxyConfig.url}/api/planes/ciudad/${idCiudad}`);
};

const getPlanById = idPlan => {
  return axios.get(`${proxyConfig.url}/api/plan/${idPlan}`);
};

const saveBasicInfo = plan => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/plan/basic`, plan, { headers });
};

const savePlanMainPicture = (idUsuario, idPlan, file) => {
  let headers = { 'x-access-token': getToken() };

  let data = new FormData();
  data.append('idUsuario', idUsuario);
  data.append('idPlan', idPlan);
  data.append('file', file);

  return axios.post(`${proxyConfig.url}/api/plan/picture`, data, {
    headers: {
      accept: 'application/json',
      // 'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      ...headers,
    },
  });
};

const savePlanIncluidos = plan => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/plan/incluidos`, plan, { headers });
};

const savePlanItinerario = plan => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/plan/itinerario`, plan, {
    headers,
  });
};

const savePlanLugares = plan => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/plan/lugares`, plan, { headers });
};

const savePlanActividades = plan => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/plan/actividades`, plan, {
    headers,
  });
};

export function* getPlanesSaga() {
  try {
    const response = yield call(getPlanes);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLANES_GET_SUCCESS', planes: data.planes });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'error',
        mensaje: 'No se pudieron sincronizar los planes',
      });

      yield put({
        type: 'PLANES_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'No se pudieron sincronizar los planes',
    });

    yield put({
      type: 'PLANES_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getPlanesByPlannerSaga(action) {
  try {
    const response = yield call(getPlanesByPlanner, action.idPlanner);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLANES_GET_SUCCESS', planes: data.planes });
    } else {
      console.log(data.error);

      yield put({
        type: 'PLANES_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'PLANES_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getPlanesByCiudadSaga(action) {
  try {
    const response = yield call(getPlanesByCiudad, action.idCiudad);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLANES_GET_SUCCESS', planes: data.planes });
    } else {
      console.log(data.error);

      yield put({
        type: 'PLANES_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'PLANES_GET_ERROR',
      error,
      mensaje: error.message,
    });
  }
}

export function* getPlanByIdSaga(action) {
  try {
    const response = yield call(getPlanById, action.idPlan);
    const data = response.data;

    if (data.success) {
      let { plan } = data;

      // Si ya tiene la información completa va a agencypage
      if (plan.isInfoCompleted && action.toPlanPage) {
        action.toPlanPage(plan.idPlan);
      }

      yield put({
        type: 'PLAN_GET_BY_ID_SUCCESS',
        plan: plan,
      });

      if (action.onSuccess) action.onSuccess(plan);
    } else {
      console.log(data.error);

      yield put({
        type: 'PLAN_GET_BY_ID_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'PLAN_GET_BY_ID_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* savePlanBasicInfoSaga(action) {
  try {
    const response = yield call(saveBasicInfo, action.plan);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLAN_SAVE_SUCCESS', plan: data.plan });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      if (!action.plan.idPlan && action.onSuccess) {
        action.onSuccess(data.plan.idPlan);
      }

      yield put({ type: 'PLAN_GET_BY_ID_SUCCESS', plan: data.plan });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLAN_SAVE_ERROR',
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
      type: 'PLAN_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* savePlanMainPictureSaga(action) {
  try {
    const response = yield call(
      savePlanMainPicture,
      action.idUsuario,
      action.idPlan,
      action.file
    );
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLAN_SAVE_SUCCESS', plan: data.plan });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLAN_GET_BY_ID_SUCCESS', plan: data.plan });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLAN_SAVE_ERROR',
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
      type: 'PLAN_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* savePlanIncluidosSaga(action) {
  try {
    const response = yield call(savePlanIncluidos, action.plan);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLAN_SAVE_SUCCESS', plan: data.plan });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLAN_GET_BY_ID_SUCCESS', plan: data.plan });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLAN_SAVE_ERROR',
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
      type: 'PLAN_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* savePlanItinerarioSaga(action) {
  try {
    const response = yield call(savePlanItinerario, action.plan);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLAN_SAVE_SUCCESS', plan: data.plan });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLAN_GET_BY_ID_SUCCESS', plan: data.plan });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLAN_SAVE_ERROR',
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
      type: 'PLAN_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* savePlanLugaresSaga(action) {
  try {
    const response = yield call(savePlanLugares, action.plan);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLAN_SAVE_SUCCESS', plan: data.plan });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLAN_GET_BY_ID_SUCCESS', plan: data.plan });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLAN_SAVE_ERROR',
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
      type: 'PLAN_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}

export function* savePlanActividadesSaga(action) {
  try {
    const response = yield call(savePlanActividades, action.plan);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLAN_SAVE_SUCCESS', plan: data.plan });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLAN_GET_BY_ID_SUCCESS', plan: data.plan });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLAN_SAVE_ERROR',
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
      type: 'PLAN_SAVE_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}
