import { type } from 'os';
const ActionTypes = {
  SIGN_IN_SUCCESS: "[User] Login success",
  SIGN_IN_ERROR: "[User] Login error",
  SIGN_OUT: "[User] Logout",
  Register_IN_SUCCESS: "[User] Register Success",
  Register_IN_ERROR: "[User] Register error"
};

const loginSuccess = (user: object) => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    user,
  };
};

const loginError = (error: string) => {
  return {
    type: ActionTypes.SIGN_IN_ERROR,
    error,
  };
};

const logout = () => {
  return { type: ActionTypes.SIGN_OUT };
};


const registerSuccess =(user:object) => {
  return {
    type
  }
}

const UserActions = { loginError, loginSuccess, logout, ActionTypes };

export default UserActions;

