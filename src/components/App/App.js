import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import RoutesAPI from "../../services/RoutesAPI";

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

function App({ isLogged }) {
  return (
    <div>
      <Header />
      <Switch>
        <Route
          path={RoutesAPI.pathNewArticle()}
          render={({ history }) => (
            <PrivateRoute isLogged={isLogged} defaultPath="/sign-in">
              <CreateArticle history={history} />
            </PrivateRoute>
          )}
        />
        <Route
          path={RoutesAPI.pathProfile()}
          render={() => (
            <PrivateRoute isLogged={isLogged} defaultPath="/sign-in">
              <EditProfile />
            </PrivateRoute>
          )}
        />
        <Route
          path={RoutesAPI.pathSingUp()}
          render={() => (
            <PrivateRoute isLogged={!isLogged} defaultPath="/">
              <SingUp />
            </PrivateRoute>
          )}
        />
        <Route
          path={RoutesAPI.pathSingIn()}
          render={() => (
            <PrivateRoute isLogged={!isLogged} defaultPath="/">
              <SingIn />
            </PrivateRoute>
          )}
        />

        <Route
          path={RoutesAPI.pathEditArticle()}
          render={({ match, history }) => {
            const { articleId } = match.params;
            return (
              <PrivateRoute isLogged={isLogged} defaultPath="/sign-in">
                <EditArticle articleId={articleId} history={history} />
              </PrivateRoute>
            );
          }}
        />
        <Route
          path={RoutesAPI.pathSingleArticle()}
          render={({ match, history }) => {
            const { articleId } = match.params;
            return <SingleArticle articleId={articleId} history={history} />;
          }}
        />
        <Route
          path={RoutesAPI.pathPage()}
          render={({ match, history }) => {
            const { page } = match.params;
            return <ArticleList page={page} history={history} />;
          }}
        />
        <Route path={RoutesAPI.pathArticles()} component={ArticleList} exact />
        <Route path={RoutesAPI.pathMain()} component={ArticleList} exact />

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
  isLogged: PropTypes.bool,
};

App.defaultProps = {
  isLogged: false,
};

const mapStateToProps = (state) => ({
  isLogged: state.isLoggedIn,
});

export default connect(mapStateToProps)(App);
