import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import ArticleWrapper from "../../Article";
import ErrorBlock from "../../ErrorBlock";
import CustomSpin from "../../CustonSpin";

import cl from "./ArticleList.module.scss";
import "./ArticleList.scss";

const ArticleList = ({
  loading,
  error,
  articles,
  totalPages,
  loadArticles,
}) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadArticles(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderError = () => {
    return (
      <ErrorBlock>
        Error! Please, check your internet connection and try again
      </ErrorBlock>
    );
  };

  const renderLoading = () => {
    return <CustomSpin />;
  };

  const renderArticleList = () => {
    return articles.map((article) => {
      return (
        <li key={article.slug} className={cl.block}>
          <ArticleWrapper article={article} />
        </li>
      );
    });
  };

  const contentToRender = () => {
    if (error) {
      return renderError();
    }
    if (loading) {
      return renderLoading();
    }
    return renderArticleList();
  };

  return (
    <main>
      <ul className={cl.content}>{contentToRender()}</ul>
      <Pagination
        onChange={setPage}
        className={cl.pagination}
        defaultCurrent={1}
        current={page}
        total={totalPages}
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
};

ArticleList.defaultProps = {
  loading: false,
  error: null,
  articles: [],
  totalPages: 1,
};

const mapStateToProps = (state) => ({
  loading: state.articles.loading,
  error: state.articles.error,
  articles: state.articles.data,
  totalPages: state.articles.totalPages,
});

const mapDispatchToProps = (dispatch) => {
  const { loadArticles } = bindActionCreators(actions, dispatch);
  return { loadArticles };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
