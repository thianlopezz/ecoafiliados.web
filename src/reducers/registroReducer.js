let defaultState = {
  loading: false,
  registro: {},
  registrado: false,
};

const registroReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTRO':
      return { ...state, loading: true, registro: action.registro };
    case 'REGISTRO_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'REGISTRO_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
        mensaje: action.mensaje,
      };
    case 'VERIFICAR':
      return {
        ...state,
        loading: true,
        verified: false,
      };
    case 'VERIFICAR_SUCCESS':
      return {
        ...state,
        loading: false,
        verified: true,
        mensaje: undefined,
      };
    case 'VERIFICAR_ERROR':
      return {
        ...state,
        loading: false,
        verified: false,
        mensaje: action.mensaje,
      };
    default:
      return { ...state };
  }
};

export default registroReducer;
