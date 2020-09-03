import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/AsyncActions";

import EditProfileCard from "./EditProfileCard";

function EditProfile({ update, loading, error }) {
  return <EditProfileCard update={update} loading={loading} error={error} />;
}

EditProfile.propTypes = {
  update: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  loading: PropTypes.bool,
};

EditProfile.defaultProps = {
  error: null,
  loading: false,
};

const mapStateToProps = (state) => ({
  error: state?.user?.error,
});

const mapDispatchToProps = (dispatch) => {
  const { update } = bindActionCreators(actions, dispatch);
  return {
    update,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
