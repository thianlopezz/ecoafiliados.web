let initialState = {
  loading: false,
  loadingList: false,
  salida: {},
  salidas: [],
  error: {},
};

export default function reservaReducer(state = initialState, action) {
  switch (action.type) {
    case 'SALIDA_GET':
      return { ...state, loadingList: true };
    case 'SALIDA_GET_SUCCESS':
      return { ...state, loadingList: false, salida: { ...action.salida } };
    case 'SALIDA_SAVE':
      return { ...state, loading: true };
    case 'SALIDA_SAVE_SUCCESS':
      return { ...state, loading: false };
    default:
      return state;
  }
}
