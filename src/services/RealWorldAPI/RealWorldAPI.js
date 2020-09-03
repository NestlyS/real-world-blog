import axiosLib from "axios";
import LocalStorageAPI from "../LocalStorageAPI";
import ServerRoutesAPI from "../ServerRoutesAPI";

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
  if (!response.data) {
    throw new Error("No data! Check Internet connection!");
  }
  return response.data;
});

// ------------------------------------------------
// Функции

export async function getArticles(page = 1) {
  const responce = await axios.get(ServerRoutesAPI.pathArticles(), {
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
  return axios.get(ServerRoutesAPI.pathArticle(articleId));
}

export async function registration(email, username, password) {
  return axios.post(ServerRoutesAPI.pathRegistration(), {
    user: {
      username,
      email,
      password,
    },
  });
}

export async function authentication(email, password) {
  return axios.post(ServerRoutesAPI.pathAuthentication(), {
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
  return axios.put(ServerRoutesAPI.pathUpdate(), { user });
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
  return axios.post(ServerRoutesAPI.pathCreateArticle(), { article });
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
  return axios.put(ServerRoutesAPI.pathUpdateArticle(articleId), { article });
}

export async function deleteArticle(articleId) {
  return axios.delete(ServerRoutesAPI.pathDeleteArticle(articleId));
}

export async function favoriteArticle(articleId) {
  return axios.post(ServerRoutesAPI.pathFavoriteArticle(articleId));
}

export async function unfavoriteArticle(articleId) {
  return axios.delete(ServerRoutesAPI.pathUnfavoriteArticle(articleId));
}

export async function getUser() {
  return axios.get(ServerRoutesAPI.getUser());
}
