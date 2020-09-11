import { logOut } from './sesion';

export const handleAxiosError = error => {
  console.log(error);
  if (!error.status) return;

  if (error.response.status == 500) {
    // window.location = '/500';
  } else if (error.response.status == 404) {
    // window.location = '/404';
  } else if (error.response.status == 403) {
    window.location = '/login';
    logOut();
  }
};
