import { cloneDeep } from "lodash";
import RealWorldAPI from "../services/RealWorldAPI";
import * as syncActions from "./SyncActions";
import LocalStorageAPI from "../services/LocalStorageAPI";

export const asyncRequestHandler = ({
  loadingAction,
  dataAction,
  errorAction,
  asyncCallback,
  args,
}) => async (dispatch) => {
  try {
    dispatch(loadingAction());
    const data = await asyncCallback(...args);
    dispatch(dataAction(data));
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
    dispatch(errorAction(errorData));
  }
};

export const loadArticles = (page = 1) =>
  asyncRequestHandler({
    loadingAction: syncActions.articlesSetLoading,
    dataAction: syncActions.articlesSetData,
    errorAction: syncActions.articlesSetError,
    asyncCallback: RealWorldAPI.getArticles.bind(RealWorldAPI),
    args: [page],
  });

export const loadArticle = (articleId) =>
  asyncRequestHandler({
    loadingAction: syncActions.articleSetLoading,
    dataAction: syncActions.articleSetData,
    errorAction: syncActions.articleSetError,
    asyncCallback: RealWorldAPI.getArticle.bind(RealWorldAPI),
    args: [articleId],
  });

export const register = (email, username, password) =>
  asyncRequestHandler({
    loadingAction: syncActions.userSetLoading,
    dataAction: syncActions.userSetData,
    errorAction: syncActions.userSetError,
    asyncCallback: RealWorldAPI.registration.bind(RealWorldAPI),
    args: [email, username, password],
  });

export const login = (email, password) =>
  asyncRequestHandler({
    loadingAction: syncActions.userSetLoading,
    dataAction: syncActions.userSetData,
    errorAction: syncActions.userSetError,
    asyncCallback: RealWorldAPI.authentication.bind(RealWorldAPI),
    args: [email, password],
  });

export const update = (email, password, username, image) =>
  asyncRequestHandler({
    loadingAction: syncActions.userSetLoading,
    dataAction: syncActions.userSetData,
    errorAction: syncActions.userSetError,
    asyncCallback: RealWorldAPI.update.bind(RealWorldAPI),
    args: [email, username, password, image],
  });

export const createArticle = (title, description, body, tagList) =>
  asyncRequestHandler({
    loadingAction: syncActions.articleSetLoading,
    dataAction: syncActions.articleSetData,
    errorAction: syncActions.articleSetError,
    asyncCallback: RealWorldAPI.createArticle.bind(RealWorldAPI),
    args: [title, description, body, tagList],
  });

export const updateArticle = (articleId, title, description, body, tagList) =>
  asyncRequestHandler({
    loadingAction: syncActions.articleSetLoading,
    dataAction: syncActions.articleSetData,
    errorAction: syncActions.articleSetError,
    asyncCallback: RealWorldAPI.updateArticle.bind(RealWorldAPI),
    args: [articleId, title, description, body, tagList],
  });

export const getUser = () =>
  asyncRequestHandler({
    loadingAction: syncActions.userSetLoading,
    dataAction: syncActions.userSetData,
    errorAction: syncActions.userSetError,
    asyncCallback: RealWorldAPI.getUser.bind(RealWorldAPI),
    args: [],
  });

export const deleteArticle = (articleId) => async (dispatch) => {
  try {
    await RealWorldAPI.deleteArticle(articleId);
    dispatch(syncActions.articleSetData(null));
  } catch (error) {
    dispatch(syncActions.articleSetError(error?.response?.data?.errors));
  }
};

export const favoriteArticle = (articleId) => async (dispatch) => {
  try {
    const data = await RealWorldAPI.favoriteArticle(articleId);
    dispatch(syncActions.articleSetData(data));
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
    dispatch(syncActions.articleSetError(errorData));
  }
};

export const unfavoriteArticle = (articleId) => async (dispatch) => {
  try {
    const data = await RealWorldAPI.unfavoriteArticle(articleId);
    dispatch(syncActions.articleSetData(data));
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
    dispatch(syncActions.articleSetError(errorData));
  }
};

export const optimisticFavoriteArticle = (
  article,
  callbackDispatchedAction
) => async (dispatch) => {
  try {
    const token = LocalStorageAPI.load("token");
    if (token) {
      const clone = cloneDeep(article);
      clone.favorited = true;
      clone.favoritesCount += 1;
      callbackDispatchedAction({ article: clone });
    }
    dispatch(favoriteArticle(article.slug));
  } catch (err) {
    dispatch(syncActions.articleSetError(err.message));
  }
};

export const optimisticUnfavoriteArticle = (
  article,
  callbackDispatchedAction
) => async (dispatch) => {
  try {
    const token = LocalStorageAPI.load("token");
    if (token) {
      const clone = cloneDeep(article);
      clone.favorited = false;
      clone.favoritesCount -= 1;
      callbackDispatchedAction({ article: clone });
    }
    dispatch(unfavoriteArticle(article.slug));
  } catch (err) {
    dispatch(syncActions.articleSetError(err.message));
  }
};
