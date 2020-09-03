import * as types from "./ActionTypes";

/* USER */

export const logout = () => ({
  type: types.userData,
  payload: {
    data: { user: {} },
  },
});

export const userSetError = (error) => ({
  type: types.userError,
  payload: {
    error,
  },
});

export const userSetData = (user) => ({
  type: types.userData,
  payload: {
    data: user,
  },
});

export const userSetLoading = () => ({
  type: types.userLoading,
});

/* ARTICLE (SINGLE) */

export const articleSetData = (article) => ({
  type: types.articleData,
  payload: {
    /* Тут дата - и есть статья, так как больше информации вместе со статьей не передается */
    data: article,
  },
});

export const articleSetError = (error) => ({
  type: types.articleError,
  payload: { error },
});

export const articleSetLoading = () => ({
  type: types.articleLoading,
});

/* ARTICLES (MULTIPLY) */

export const articlesSetLoading = () => ({
  type: types.articlesLoading,
});

export const articlesSetError = (error) => ({
  type: types.articlesError,
  payload: { error },
});

export const articlesSetData = (articles) => ({
  type: types.articlesData,
  payload: {
    /* Тут data - объект из двух возможных полей - total pages и articles */
    data: articles,
  },
});

export const articlesUpdateData = (article) => ({
  type: types.articlesUpdateData,
  payload: {
    /* Тут мы просто передает статью, которой надо заменить одну из статей оригинального массива статей */
    data: article,
  },
});

/* LOGGED IN */

export const setLoggedIn = () => ({
  type: types.setLoggedIn,
});

export const setUnloggedIn = () => ({
  type: types.setUnloggedIn,
});
