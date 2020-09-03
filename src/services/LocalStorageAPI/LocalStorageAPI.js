import { userData } from "../../redux/ActionTypes";
import * as syncActions from "../../redux/SyncActions";

export const save = (key, state) => {
  localStorage.setItem(key, state);
};

export const load = (key) => {
  return localStorage.getItem(key);
};

export const saveTokenMiddleware = (store) => (next) => (action) => {
  const token = action?.payload?.data?.user?.token || "";
  if (action?.type === userData && action?.payload?.data?.user) {
    save("token", token);
    if (token) {
      store.dispatch(syncActions.setLoggedIn());
    } else {
      store.dispatch(syncActions.setUnloggedIn());
    }
  }

  next(action);
};
