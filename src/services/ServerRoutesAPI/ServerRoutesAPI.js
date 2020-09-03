const baseUrl = "https://conduit.productionready.io/api";

export function pathArticles() {
  return `${baseUrl}/articles`;
}

export function pathArticle(articleId) {
  return `${baseUrl}/articles/${articleId}`;
}

export function pathRegistration() {
  return `${baseUrl}/users`;
}

export function pathAuthentication() {
  return `${baseUrl}/users/login`;
}

export function pathUpdate() {
  return `${baseUrl}/user`;
}

export function pathCreateArticle() {
  return `${baseUrl}/articles`;
}

export function pathUpdateArticle(articleId) {
  return `${baseUrl}/articles/${articleId}`;
}

export function pathDeleteArticle(articleId) {
  return `${baseUrl}/articles/${articleId}`;
}

export function pathFavoriteArticle(articleId) {
  return `${baseUrl}/articles/${articleId}/favorite`;
}

export function pathUnfavoriteArticle(articleId) {
  return `${baseUrl}/articles/${articleId}/favorite`;
}

export function getUser() {
  return `${baseUrl}/user`;
}
