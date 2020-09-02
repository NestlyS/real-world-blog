export default function modifyArticleListWithArticle(articleList, article) {
  return articleList.map((articleItem) => {
    if (articleItem?.slug === article?.slug) {
      return article;
    }
    return articleItem;
  });
}
