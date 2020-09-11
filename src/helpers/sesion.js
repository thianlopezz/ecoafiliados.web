export const getSesion = () => {
  return JSON.parse(localStorage.getItem('usuario'));
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logOut = () => {
  localStorage.removeItem('usuario');
  localStorage.removeItem('token');
};
