/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "../../ArticleForm";
import * as asyncActions from "../../../redux/AsyncActions";
import * as syncActions from "../../../redux/SyncActions";
import useFinally from "../../../utils/Hooks";

export const CreateArticle = ({
  loading,
  error,
  createArticle,
  history,
  articleSetError,
}) => {
  useEffect(() => articleSetError(null), []);
  const setSubmitted = useFinally(loading, error, () => history.replace("/"));
  return (
    <ArticleForm
      title="Create new article"
      loading={loading}
      error={error}
      callback={(...data) => {
        createArticle(...data);
        setSubmitted(true);
      }}
    />
  );
};

CreateArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

CreateArticle.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = (state) => ({
  loading: state?.article?.loading,
  error: state?.article?.error,
});

const mapDispatchToProps = {
  createArticle: asyncActions.createArticle,
  articleSetError: syncActions.articleSetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
