/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as asyncActions from "../../../redux/AsyncActions";
import * as syncActions from "../../../redux/SyncActions";

import ArticleWrapper from "../../Article";
import { ErrorBlock } from "../../Error";
import CustomSpin from "../../CustonSpin";
import StatusRender from "../../StatusRender";

import cl from "./ArticleList.module.scss";
import "./ArticleList.scss";

const ArticleList = ({
  loading,
  error,
  articles,
  page,
  history,
  totalPages,
  loadArticles,
  optimisticFavoriteArticle,
  optimisticUnfavoriteArticle,
  articlesUpdateData,
}) => {
  const setPage = (newPage) => {
    history.replace(`/${newPage}`);
  };
  /* Загрузить список статей после загрузки страницы и обновлять их каждые 5 секунд */
  useEffect(() => {
    loadArticles(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <main>
      <ul className={cl.content}>
        <StatusRender
          errorBlock={[
            {
              condition: error?.internet,
              block: (
                <ErrorBlock>
                  Looks like there is problem with connection. Please, try again
                  later.
                </ErrorBlock>
              ),
            },
          ]}
          loadingBlock={{
            condition: loading,
            block: <CustomSpin />,
          }}
          dataBlock={{
            condition: true,
            block: articles.map((article) => {
              return (
                <li key={article.slug} className={cl.block}>
                  <ArticleWrapper
                    article={article}
                    favoriteArticle={() => {
                      optimisticFavoriteArticle(article, articlesUpdateData);
                    }}
                    unfavoriteArticle={() => {
                      optimisticUnfavoriteArticle(article, articlesUpdateData);
                    }}
                  />
                </li>
              );
            }),
          }}
        />
      </ul>
      <Pagination
        onChange={setPage}
        className={cl.pagination}
        defaultCurrent={1}
        current={Number(page)}
        total={totalPages}
        defaultPageSize={1}
        hideOnSinglePage
        showSizeChanger={false}
        responsive
        size="small"
        itemRender={(pageNumber, type, originalElement) => {
          if (type === "prev") {
            return (
              <div className={cl["prev-pagination"]}>{originalElement}</div>
            );
          }
          if (type === "next") {
            return (
              <div className={cl["next-pagination"]}>{originalElement}</div>
            );
          }
          return <div className="active">{pageNumber}</div>;
        }}
      />
    </main>
  );
};

ArticleList.propTypes = {
  loadArticles: PropTypes.func.isRequired,
  optimisticFavoriteArticle: PropTypes.func.isRequired,
  optimisticUnfavoriteArticle: PropTypes.func.isRequired,
  articlesUpdateData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  totalPages: PropTypes.number,
  page: PropTypes.string,
};

ArticleList.defaultProps = {
  loading: false,
  error: null,
  articles: [],
  totalPages: 1,
  page: "1",
};

const mapStateToProps = (state) => ({
  loading: state.articles.loading,
  error: state.articles.error,
  articles: state.articles.data,
  totalPages: state.articles.totalPages,
});

const mapDispatchToProps = {
  loadArticles: asyncActions.loadArticles,
  optimisticFavoriteArticle: asyncActions.optimisticFavoriteArticle,
  optimisticUnfavoriteArticle: asyncActions.optimisticUnfavoriteArticle,
  articlesUpdateData: syncActions.articlesUpdateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
