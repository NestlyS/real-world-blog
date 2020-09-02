import RealWorldAPI from "../utils/RealWorldAPI";
import * as syncActions from "./SyncActions";
import * as types from "./ActionTypes";

export const proxyRealworldAPI = ({
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
    if (!errorData && error.isAxiosError) {
      // Если нет ответа от сервера = нет Интернета
      errorData = {
        // в идеальном случае
        internet: "no connection",
      };
    }
    if (!errorData) {
      errorData = {
        unknown: error.message,
      };
    }
    dispatch({ type: errorAction, payload: { error: errorData } });
  }
};

export const loadArticles = (page = 1) =>
  proxyRealworldAPI({
    loadingAction: types.articlesLoading,
    dataAction: types.articlesData,
    errorAction: types.articlesError,
    asyncCallback: RealWorldAPI.getArticles.bind(RealWorldAPI),
    args: [page],
  });

export const loadArticle = (articleId) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.getArticle.bind(RealWorldAPI),
    args: [articleId],
  });

export const register = (email, username, password) =>
  proxyRealworldAPI({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.registration.bind(RealWorldAPI),
    args: [email, username, password],
  });

export const login = (email, password) =>
  proxyRealworldAPI({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.authentication.bind(RealWorldAPI),
    args: [email, password],
  });

export const update = (email, password, username, image) =>
  proxyRealworldAPI({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.update.bind(RealWorldAPI),
    args: [email, username, password, image],
  });

export const createArticle = (title, description, body, tagList) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.createArticle.bind(RealWorldAPI),
    args: [title, description, body, tagList],
  });

export const updateArticle = (articleId, title, description, body, tagList) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.updateArticle.bind(RealWorldAPI),
    args: [articleId, title, description, body, tagList],
  });

export const getUser = () =>
  proxyRealworldAPI({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.getUser.bind(RealWorldAPI),
    args: [],
  });

export const deleteArticle = (articleId) => async (dispatch) => {
  try {
    await RealWorldAPI.deleteArticle(articleId);
    dispatch({ type: types.articleData, payload: { data: { article: null } } });
  } catch (error) {
    dispatch({
      type: types.articleError,
      payload: { error: error?.response?.data?.errors },
    });
  }
};

export const favoriteArticle = (articleId) => async (dispatch) => {
  try {
    const data = await RealWorldAPI.favoriteArticle(articleId);
    dispatch(syncActions.articleSetData(data.article));
    dispatch(syncActions.articlesUpdateData(data.article));
  } catch (error) {
    let errorData = error.response?.data?.errors;
    if (!errorData) {
      // Если нет ответа от сервера = нет Интернета
      errorData = {
        // в идеальном случае
        internet: "no connection",
      };
    }
    dispatch({ type: types.articleError, payload: { error: errorData } });
  }
};

export const unfavoriteArticle = (articleId) => async (dispatch) => {
  try {
    const data = await RealWorldAPI.unfavoriteArticle(articleId);
    dispatch(syncActions.articleSetData(data.article));
    dispatch(syncActions.articlesUpdateData(data.article));
  } catch (error) {
    let errorData = error.response?.data?.errors;
    if (!errorData) {
      // Если нет ответа от сервера = нет Интернета
      errorData = {
        // в идеальном случае
        internet: "no connection",
      };
    }
    dispatch({ type: types.articleError, payload: { error: errorData } });
  }
};
