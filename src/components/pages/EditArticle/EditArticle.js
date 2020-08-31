/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "../../ArticleForm";
import * as actions from "../../../redux/actions";
import useFinally from "../../../utils/Hooks";

export const EditArticle = ({
  articleId,
  article,
  loading,
  error,
  token,
  loadArticle,
  updateArticle,
  history,
}) => {
  useEffect(() => {
    if (!article || article.slug !== articleId) {
      loadArticle(articleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setSubmitted = useFinally(loading, error, () => history.replace("/"));
  return (
    <ArticleForm
      title="Edit article"
      loading={loading}
      error={error}
      callback={(...data) => {
        updateArticle(token, ...data, articleId);
        setSubmitted(true);
      }}
      article={{
        title: article?.title,
        short: article?.description,
        body: article?.body,
        tags: article?.tagList,
      }}
    />
  );
};

EditArticle.propTypes = {
  updateArticle: PropTypes.func.isRequired,
  loadArticle: PropTypes.func.isRequired,
  token: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
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
  articleId: PropTypes.string.isRequired,
};

EditArticle.defaultProps = {
  article: {},
  loading: false,
  error: null,
  token: null,
};

const mapStateToProps = (state) => ({
  token: state?.user?.data?.token,
  article: state?.article?.data,
  loading: state?.article?.loading,
  error: state?.article?.error,
});

const mapDispatchToProps = {
  updateArticle: actions.updateArticle,
  loadArticle: actions.loadArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
