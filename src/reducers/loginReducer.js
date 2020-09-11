// let user = localStorage.getItem("user");
let usuario = JSON.parse(localStorage.getItem('usuario'));

let defaultState = {
  loading: false,
  usuario,
  logged: usuario ? true : false,
  showLoginModal: false,
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loading: true, login: action.login };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        usuario: { ...action.usuario },
        logged: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'LOGOUT':
      return {
        ...state,
        logged: false,
        usuario: undefined,
      };
    case 'SHOW_LOGIN_MODAL':
      return {
        ...state,
        showLoginModal: action.show,
      };
    default:
      return { ...state };
  }
};

export default loginReducer;
