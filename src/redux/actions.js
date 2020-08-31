import RealWorldAPI from "../utils/RealWorldAPI";
import * as types from "./actionTypes";

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
    if (!errorData) {
      // Если нет ответа от сервера = нет Интернета
      errorData = {
        // в идеальном случае
        internet: "no connection",
      };
    }
    dispatch({ type: errorAction, payload: { error: errorData } });
  }
};

export const loadArticles = (page = 1, token) =>
  proxyRealworldAPI({
    loadingAction: types.articlesLoading,
    dataAction: types.articlesData,
    errorAction: types.articlesError,
    asyncCallback: RealWorldAPI.getArticles.bind(RealWorldAPI),
    args: [page, token],
  });

export const loadArticle = (articleId, token) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.getArticle.bind(RealWorldAPI),
    args: [articleId, token],
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

export const update = (token, email, password, username, image) =>
  proxyRealworldAPI({
    loadingAction: types.userLoading,
    dataAction: types.userData,
    errorAction: types.userError,
    asyncCallback: RealWorldAPI.update.bind(RealWorldAPI),
    args: [token, email, username, password, image],
  });

export const createArticle = (token, title, description, body, tagList) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.createArticle.bind(RealWorldAPI),
    args: [token, title, description, body, tagList],
  });

export const updateArticle = (
  token,
  title,
  description,
  body,
  tagList,
  articleId
) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.updateArticle.bind(RealWorldAPI),
    args: [token, title, description, body, tagList, articleId],
  });

export const deleteArticle = (token, articleId) => async (dispatch) => {
  try {
    await RealWorldAPI.deleteArticle(token, articleId);
    dispatch({ type: types.articleData, payload: { data: { article: null } } });
  } catch (error) {
    dispatch({
      type: types.articleError,
      payload: { error: error?.response?.data?.errors },
    });
  }
};

export const favoriteArticle = (token, articleId) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.favoriteArticle.bind(RealWorldAPI),
    args: [token, articleId],
  });

export const unfavoriteArticle = (token, articleId) =>
  proxyRealworldAPI({
    loadingAction: types.articleLoading,
    dataAction: types.articleData,
    errorAction: types.articleError,
    asyncCallback: RealWorldAPI.unfavoriteArticle.bind(RealWorldAPI),
    args: [token, articleId],
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
