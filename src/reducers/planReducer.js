let initialState = {
  loading: false,
  loadingList: false,
  plan: {},
  planes: [],
  stepForm: 0,
  error: {},
};

export default function lugarReducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAN_CHANGE':
      return { ...state, plan: { ...action.plan } };
    case 'PLAN_STEP_FORM_CHANGE':
      return { ...state, stepForm: action.stepForm };
    case 'PLANES_GET':
      return { ...state, loadingList: true };
    case 'PLANES_GET_SUCCESS':
      return {
        ...state,
        loadingList: false,
        planes: [...action.planes],
        lastSync: new Date(),
      };
    case 'PLANES_GET_ERROR':
      return {
        ...state,
        loadingList: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'PLANES_GET_BY_CIUDAD':
      return { ...state, loadingList: true };
    case 'PLANES_GET_BY_PLANNER':
      return { ...state, loadingList: true };
    case 'PLANES_GET_BY_PLANNER_SUCCESS':
      return { ...state, loadingList: false, planes: [...action.planes] };
    case 'PLAN_GET_BY_ID':
      return { ...state, loadingList: true };
    case 'PLAN_GET_BY_ID_SUCCESS':
      return {
        ...state,
        loadingList: false,
        plan: { ...action.plan, lastSync: new Date() },
      };
    case 'PLAN_GET_BY_ID_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'PLAN_BASIC_INFO_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLAN_MAIN_PICTURE_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLAN_INCLUIDOS_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLAN_ITINERARIOS_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLAN_LUGARES_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLAN_ACTIVIDADES_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLAN_SAVE_SUCCESS':
      let index = state.planes.findIndex(
        plan => plan.idPlan == action.plan.idPlan
      );

      let newPlanesState = [];

      if (index == -1) {
        newPlanesState = [...state.planes, action.plan];
      } else {
        newPlanesState = replaceArrayPlans(state.planes, action.plan);
      }

      return {
        ...state,
        loading: false,
        planes: newPlanesState,
      };
    case 'PLAN_SAVE_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    default:
      return state;
  }

  function replaceArrayPlans(state, plan) {
    let index = state.findIndex(x => x.idPlan === plan.idPlan);
    let arr = Object.assign([], state);
    arr[index] = plan;
    return arr;
  }
}
