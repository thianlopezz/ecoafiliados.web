let initialState = {
  loading: false,
  loadingList: false,
  pais: {},
  paises: [],
  error: {},
};

export default function paisReducer(state = initialState, action) {
  switch (action.type) {
    case 'PAISES_GET':
      return { ...state, loadingList: true };
    case 'PAISES_GET_SUCCESS':
      return { ...state, loadingList: false, paises: action.paises };
    case 'PAISES_GET_ERROR':
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
