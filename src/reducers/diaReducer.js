let initialState = {
  loading: false,
  loadingList: false,
  dia: {},
  dias: [],
  error: {},
};

export default function diaReducer(state = initialState, action) {
  switch (action.type) {
    case 'DIAS_GET':
      return { ...state, loadingList: true };
    case 'DIAS_GET_SUCCESS':
      return { ...state, loadingList: false, dias: [...action.dias] };
    case 'DIAS_GET_ERROR':
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
