/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import { ErrorBlock } from "../../Error";
import ArticleWrapper from "../../Article";
import StatusRender from "../../StatusRender";
import cl from "./SingleArticle.module.scss";

function SingleArticle({
  articleId,
  user,
  article,
  loading,
  error,
  deleteArticle,
  loadArticle,
  favoriteArticle,
  unfavoriteArticle,
  history,
}) {
  /* Загрузить статью, если её ещё нет в хранилище или в хранилище не та статья */
  useEffect(() => {
    if (!article || article.slug !== articleId) {
      loadArticle(articleId, user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* Функция, по которой определяется рендерить кнопки управления или нет. */
  const getDeleteArticle = () => {
    if (user.username !== article?.author.username) {
      return null;
    }
    return async () => {
      await deleteArticle(user.token, articleId);
      history.replace("/");
    };
  };
  return (
    <StatusRender
      errorBlock={[
        {
          condition: error,
          block: (
            <ErrorBlock>
              Couldn&apos;t load an article. Try again later
            </ErrorBlock>
          ),
        },
      ]}
      loadingBlock={{
        condition: loading || !article,
      }}
      dataBlock={{
        condition: true,
        block: (
          <div className={cl["single-article"]}>
            <ArticleWrapper
              article={article}
              deleteArticle={getDeleteArticle()}
              favoriteArticle={() => favoriteArticle(user.token, article.slug)}
              unfavoriteArticle={() =>
                unfavoriteArticle(user.token, article.slug)
              }
              extended
            />
          </div>
        ),
      }}
    />
  );
}

SingleArticle.propTypes = {
  articleId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
  article: PropTypes.shape({
    author: PropTypes.shape({
      bio: PropTypes.string,
      following: PropTypes.bool,
      image: PropTypes.string,
      username: PropTypes.string,
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    slug: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    updatedAt: PropTypes.string,
  }),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  loadArticle: PropTypes.func.isRequired,
  favoriteArticle: PropTypes.func.isRequired,
  unfavoriteArticle: PropTypes.func.isRequired,
};

SingleArticle.defaultProps = {
  loading: false,
  error: null,
  article: null,
  user: null,
};

const mapStateToProps = (state) => ({
  article: state.article.data,
  loading: state.article.loading,
  error: state.article.error,
  user: state.user.data,
});

const mapDispatchToProps = {
  loadArticle: actions.loadArticle,
  deleteArticle: actions.deleteArticle,
  favoriteArticle: actions.favoriteArticle,
  unfavoriteArticle: actions.unfavoriteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);
