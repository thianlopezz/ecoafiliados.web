let initialState = {
  loading: false,
  loadingList: false,
  planner: {},
  plannerOldValue: {},
  stepForm: 0,
};

export default function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case 'PLANNER_CHANGE':
      return { ...state, planner: { ...action.planner } };
    case 'PLANNNER_STEP_FORM_CHANGE':
      return { ...state, stepForm: action.stepForm };
    case 'PLANNER_GET_BY_ID':
      return { ...state, loadingList: true };
    case 'PLANNER_GET_BY_ID_SUCCESS':
      return {
        ...state,
        loadingList: false,
        planner: { ...action.planner },
        plannerOldValue: { ...action.planner },
      };
    case 'PLANNER_GET_BY_ID_ERROR':
      return {
        ...state,
        loadingList: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'PLANNER_GET_BY_ID_USUARIO':
      return { ...state, loadingList: true };
    case 'PLANNER_GET_BY_ID_USUARIO_SUCCESS':
      return {
        ...state,
        loadingList: false,
        planner: { ...action.planner },
        plannerOldValue: { ...action.planner },
        stepForm: action.stepForm,
      };
    case 'PLANNER_GET_BY_ID_USUARIO_ERROR':
      return {
        ...state,
        loadingList: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'PLANNER_BASIC_INFO_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLANNER_LOCATION_INFO_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLANNER_BRAND_INFO_SAVE':
      return {
        ...state,
        loading: true,
      };
    case 'PLANNER_SAVE_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'PLANNER_SAVE_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    default:
      return state;
  }
}
