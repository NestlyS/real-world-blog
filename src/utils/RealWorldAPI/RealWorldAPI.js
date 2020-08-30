import axios from "axios";
import {
  limit, // limit = 5 по умолчанию
} from "./config";

const baseUrl = "https://conduit.productionready.io/api";

export async function getArticles(page = 1) {
  const responce = await axios.get(`${baseUrl}/articles`, {
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
    totalPages: responce.data.articlesCount / limit,
    articles: responce.data.articles,
  };
}

export async function getArticle(articleId) {
  const responce = await axios.get(`${baseUrl}/articles/${articleId}`);
  return responce.data;
}

export async function registration(email, username, password) {
  const responce = await axios.post(`${baseUrl}/users`, {
    user: {
      username,
      email,
      password,
    },
  });
  return responce.data;
}

export async function authentication(email, password) {
  const responce = await axios.post(`${baseUrl}/users/login`, {
    user: {
      email,
      password,
    },
  });
  return responce.data;
}

export async function update(token, email, password, username, image) {
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
  const responce = await axios.put(
    `${baseUrl}/user`,
    {
      user,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return responce.data;
}

export async function createArticle(token, title, description, body, tagList) {
  const article = {
    title,
    description,
    body,
  };
  if (tagList) {
    article.tagList = tagList;
  }
  const responce = await axios.post(
    `${baseUrl}/articles`,
    {
      article,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return responce.data;
}

export async function updateArticle(
  token,
  title,
  description,
  body,
  tagList,
  articleId
) {
  const article = {
    title,
    description,
    body,
  };
  if (tagList) {
    article.tagList = tagList;
  }
  const responce = await axios.put(
    `${baseUrl}/articles/${articleId}`,
    {
      article,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return responce.data;
}

export async function deleteArticle(token, articleId) {
  const responce = await axios.delete(`${baseUrl}/articles/${articleId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return responce.data;
}

export async function favoriteArticle(token, articleId) {
  const responce = await axios.post(
    `${baseUrl}/articles/${articleId}/favorite`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return responce.data;
}

export async function unfavoriteArticle(token, articleId) {
  const responce = await axios.post(
    `${baseUrl}/articles/${articleId}/favorite`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return responce.data;
}
