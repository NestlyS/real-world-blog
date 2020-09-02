/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "../../ArticleForm";
import * as actions from "../../../redux/AsyncActions";
import useFinally from "../../../utils/Hooks";

export const CreateArticle = ({ loading, error, createArticle, history }) => {
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
  createArticle: actions.createArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
