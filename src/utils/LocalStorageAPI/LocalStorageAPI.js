/* eslint-disable import/prefer-default-export */
import { userData } from "../../redux/ActionTypes";

export const save = (key, state) => {
  localStorage.setItem(key, state);
};

export const load = (key) => {
  return localStorage.getItem(key);
};

export const saveTokenMiddleware = () => (next) => (action) => {
  if (action?.type === userData && action?.payload?.data?.user) {
    save("token", action.payload.data.user.token || "");
  }
  next(action);
};
