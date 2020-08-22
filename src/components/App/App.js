import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../Header";
import ArticleList from "../pages/ArticleList";
import SingleArticle from "../pages/SingleArticle";
import ErrorBlock from "../ErrorBlock";
import SingUp from "../pages/SingUp";
import SingIn from "../pages/SingIn";
import EditProfile from "../pages/EditProfile";

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/profile" component={EditProfile} />
        <Route path="/sing-up" component={SingUp} />
        <Route path="/sing-in" component={SingIn} />

        <Route
          path="/articles/:articleId"
          render={({ match }) => {
            const { articleId } = match.params;
            return <SingleArticle articleId={articleId} />;
          }}
        />
        <Route path="/articles/" component={ArticleList} />

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
