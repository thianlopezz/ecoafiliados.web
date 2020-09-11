let initialState = {
  loading: false,
  loadingList: false,
  ciudad: {},
  ciudades: [],
  error: {},
};

export default function ciudadReducer(state = initialState, action) {
  switch (action.type) {
    case 'CIUDADES_GET':
      return { ...state, loadingList: true };
    case 'CIUDADES_GET_SUCCESS':
      return { ...state, loadingList: false, ciudades: action.ciudades };
    case 'CIUDAD_GET_BY_ID_SUCCESS':
      return { ...state, loadingList: false, ciudad: { ...action.ciudad } };
    case 'CIUDAD_GET_BY_ID_ERROR':
      return {
        ...state,
        loadingList: false,
        error: { ...action.error },
        mensaje: action.mensaje,
      };
    default:
      return state;
  }
}
