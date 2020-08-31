/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "../../ArticleForm";
import * as actions from "../../../redux/actions";
import useFinally from "../../../utils/Hooks";

export const CreateArticle = ({
  token,
  loading,
  error,
  createArticle,
  history,
}) => {
  const setSubmitted = useFinally(loading, error, () => history.replace("/"));
  return (
    <ArticleForm
      title="Create new article"
      loading={loading}
      error={error}
      callback={(...data) => {
        createArticle(token, ...data);
        setSubmitted(true);
      }}
    />
  );
};

CreateArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

CreateArticle.defaultProps = {
  token: null,
  loading: false,
  error: null,
};

const mapStateToProps = (state) => ({
  token: state?.user?.data?.token,
  loading: state?.article?.loading,
  error: state?.article?.error,
});

const mapDispatchToProps = {
  createArticle: actions.createArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
