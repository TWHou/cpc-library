import api from '../utils/api';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const login = (user) => ({
  type: LOGIN,
  user
});

export const loginAPI = (user) => (dispatch) => {
  api.login(user).then(
    (user) => dispatch(login(user))
  );
};

const logout = () => ({
  type: LOGOUT
});

export const logoutAPI = () => (dispatch) => {
  api.logout().then(
    () => {
      dispatch(logout());
    }
  );
};