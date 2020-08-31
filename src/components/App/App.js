import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "../Header";
import ArticleList from "../pages/ArticleList";
import SingleArticle from "../pages/SingleArticle";
import { ErrorBlock } from "../Error";
import SingUp from "../pages/SingUp";
import SingIn from "../pages/SingIn";
import EditProfile from "../pages/EditProfile";
import CreateArticle from "../pages/CreateArticle";
import EditArticle from "../pages/EditArticle";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function App({ token }) {
  return (
    <div>
      <Header />
      <Switch>
        <Route
          path="/new-article"
          render={({ history }) => (
            <PrivateRoute token={token} defaultPath="/sign-in">
              <CreateArticle history={history} />
            </PrivateRoute>
          )}
        />
        <Route
          path="/profile"
          render={() => (
            <PrivateRoute token={token} defaultPath="/sign-in">
              <EditProfile />
            </PrivateRoute>
          )}
        />
        <Route
          path="/sing-up"
          render={() => (
            <PrivateRoute token={!token} defaultPath="/">
              <SingUp />
            </PrivateRoute>
          )}
        />
        <Route
          path="/sing-in"
          render={() => (
            <PrivateRoute token={!token} defaultPath="/">
              <SingIn />
            </PrivateRoute>
          )}
        />

        <Route
          path="/articles/:articleId/edit"
          render={({ match, history }) => {
            const { articleId } = match.params;
            return (
              <PrivateRoute token={token} defaultPath="/sign-in">
                <EditArticle articleId={articleId} history={history} />
              </PrivateRoute>
            );
          }}
        />
        <Route
          path="/articles/:articleId"
          render={({ match, history }) => {
            const { articleId } = match.params;
            return <SingleArticle articleId={articleId} history={history} />;
          }}
        />
        <Route
          path="/:page"
          render={({ match, history }) => {
            const { page } = match.params;
            return <ArticleList page={page} history={history} />;
          }}
        />
        <Route path="/articles/" component={ArticleList} exact />
        <Route path="/" component={ArticleList} exact />

        <Route
          render={() => {
            return <ErrorBlock> 404. That page does not exist! </ErrorBlock>;
          }}
        />
      </Switch>
    </div>
  );
}

App.propTypes = {
  token: PropTypes.string,
};

App.defaultProps = {
  token: null,
};

const mapStateToProps = (state) => ({
  token: state?.user?.data?.token,
});

export default connect(mapStateToProps)(App);
