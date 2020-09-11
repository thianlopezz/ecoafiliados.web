let initialState = {
  loading: false,
  loadingList: false,
  actividad: {},
  actividades: [],
  error: {},
};

export default function actividadReducer(state = initialState, action) {
  switch (action.type) {
    case 'ACTIVIDADES_GET':
      return { ...state, loadingList: true };
    case 'ACTIVIDADES_GET_SUCCESS':
      return {
        ...state,
        loadingList: false,
        actividades: [...action.actividades],
      };
    case 'ACTIVIDADES_GET_ERROR':
      return {
        ...state,
        loadingList: false,
        error: action.error,
        mensaje: action.mensaje,
      };
    default:
      return state;
  }
}
