import RealWorldAPI from "../utils/RealWorldAPI";
import * as types from "./actionTypes";

export const getData = ({
  loadingAction,
  dataAction,
  errorAction,
  asyncCallback,
  args,
}) => async (dispatch) => {
  try {
    dispatch({ type: loadingAction });
    const data = await asyncCallback(...args);
    dispatch({ type: dataAction, payload: { data } });
  } catch (error) {
    let errorData = error.response?.data?.errors;
    if (!errorData) {
      // Если нет ответа от сервера = нет Интернета
      errorData = {
        // в идеальном случае
        errors: {
          internet: "no connection",
        },
      };
    }
    dispatch({ type: errorAction, payload: { error: errorData } });
  }
};

export const loadArticles = (page = 1) =>
  getData({
    loadingAction: types.articlesLoading,
    dataAction: types.articlesData,
    errorAction: types.articlesError,
    asyncCallback: RealWorldAPI.getArticles.bind(RealWorldAPI),
    args: [page],
  });

export const loadArticle = (articleId) =>
  getData({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.getArticle.bind(RealWorldAPI),
    args: [articleId],
  });

export const register = (email, username, password) =>
  getData({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.registration.bind(RealWorldAPI),
    args: [email, username, password],
  });

export const login = (email, password) =>
  getData({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.authentication.bind(RealWorldAPI),
    args: [email, password],
  });

export const update = (updateData) =>
  getData({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.update.bind(RealWorldAPI),
    args: [updateData],
  });

export const logout = () => ({
  type: types.userData,
  payload: {
    data: { user: null },
  },
});

export const unsetError = () => ({
  type: types.userUnsetError,
});
