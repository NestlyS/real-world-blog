import axiosLib from "axios";
import LocalStorageAPI from "../LocalStorageAPI";
import {
  limit, // limit = 5 по умолчанию
} from "./config";

// ----------------------------------------------
// Настройка

const axios = axiosLib.create();

axios.interceptors.request.use((response) => {
  const token = LocalStorageAPI.load("token");
  if (token) {
    response.headers.common.Authorization = `Token ${token}`;
  }
  return response;
});

axios.interceptors.response.use((response) => {
  return response.data || response;
});

axios.defaults.baseURL = "https://conduit.productionready.io/api";

// ------------------------------------------------
// Функции

export async function getArticles(page = 1) {
  const responce = await axios.get(`/articles`, {
    params: {
      limit,
      offset: limit * (page - 1),
      /* limit - сколько за раз выводить постов,
                тогда в зависимости от лимита возвращаются
                сообщения с определенным смещением, причем на
                первой странице смещение = 0. */
    },
  });
  return {
    totalPages: responce.articlesCount / limit,
    articles: responce.articles,
  };
}

export async function getArticle(articleId) {
  return axios.get(`/articles/${articleId}`);
}

export async function registration(email, username, password) {
  return axios.post(`/users`, {
    user: {
      username,
      email,
      password,
    },
  });
}

export async function authentication(email, password) {
  return axios.post(`/users/login`, {
    user: {
      email,
      password,
    },
  });
}

export async function update(email, password, username, image) {
  const user = {
    email,
    username,
  };
  if (password) {
    user.password = password;
  }
  if (image) {
    user.image = image;
  }
  return axios.put(`/user`, { user });
}

export async function createArticle(title, description, body, tagList) {
  const article = {
    title,
    description,
    body,
  };
  if (tagList) {
    article.tagList = tagList;
  }
  return axios.post(`/articles`, { article });
}

export async function updateArticle(
  articleId,
  title,
  description,
  body,
  tagList
) {
  const article = {
    title,
    description,
    body,
  };
  if (tagList) {
    article.tagList = tagList;
  }
  return axios.put(`/articles/${articleId}`, { article });
}

export async function deleteArticle(articleId) {
  return axios.delete(`/articles/${articleId}`);
}

export async function favoriteArticle(articleId) {
  return axios.post(`/articles/${articleId}/favorite`);
}

export async function unfavoriteArticle(articleId) {
  return axios.delete(`/articles/${articleId}/favorite`);
}

export async function getUser() {
  return axios.get(`/user`);
}
