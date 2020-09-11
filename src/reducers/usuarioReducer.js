let initialState = {
  loading: false,
  loadingList: false,
  usuario: {},
  usuarioOldValue: {},
};

export default function usuarioReducer(state = initialState, action) {
  switch (action.type) {
    case 'USUARIO_CHANGE':
      return { ...state, usuario: { ...action.usuario } };
    case 'USUARIO_GET_BY_ID':
      return { ...state, loadingList: true };
    case 'USUARIO_GET_BY_ID_SUCCESS':
      return {
        ...state,
        loadingList: false,
        usuario: { ...action.usuario },
        usuarioOldValue: { ...action.usuario },
      };
    case 'USUARIO_GET_BY_ID_ERROR':
      return {
        ...state,
        loadingList: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'USUARIO_SAVE_PROFILE_INFO':
      return {
        ...state,
        loading: true,
      };
    case 'USUARIO_SAVE_PERSONAL_INFO':
      return {
        ...state,
        loading: true,
      };
    case 'USUARIO_SAVE_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'USUARIO_SAVE_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'USUARIO_CHANGE_PASSWORD':
      return {
        ...state,
        loading: true,
      };
    case 'USUARIO_CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        loading: false,
        usuarioContrasena: undefined,
      };
    case 'USUARIO_CHANGE_PASSWORD_ERROR':
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
