import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import App from "./components/App";
import LocalStorageAPI from "./services/LocalStorageAPI";

import reducer from "./redux/Reducer";
import * as asyncActions from "./redux/AsyncActions";
import * as syncActions from "./redux/SyncActions";

import "./index.module.scss";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(ReduxThunk, LocalStorageAPI.saveTokenMiddleware)
  )
);

if (LocalStorageAPI.load("token")) {
  store.dispatch(asyncActions.getUser());
  store.dispatch(syncActions.setLoggedIn());
} else {
  store.dispatch(syncActions.setUnloggedIn());
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
