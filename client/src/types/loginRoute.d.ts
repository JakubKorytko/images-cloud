export type LoginRouteProps = {
};

export type LoginRouteState = {
  username: string,
  password: string,
  passwordValid: boolean,
  usernameValid: boolean,
  logged: boolean,
  showExpiredModal: boolean,
  showWrongModal: boolean
};
