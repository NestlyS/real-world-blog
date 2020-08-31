/* eslint-disable import/prefer-default-export */
import { userData } from "../../redux/actionTypes";

export const save = (key, state) => {
  localStorage.setItem(key, state);
};

export const load = (key) => {
  return localStorage.getItem(key);
};

export const middleware = () => (next) => (action) => {
  if (action?.type === userData && action?.payload?.data?.user !== undefined) {
    save("user", JSON.stringify(action.payload.data.user));
  }
  next(action);
};
