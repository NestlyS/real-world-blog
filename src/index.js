import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import App from "./components/App";
import LocalStorageAPI from "./utils/LocalStorageAPI";

import reducer from "./redux/Reducer";
import * as asyncActions from "./redux/AsyncActions";

import "./index.module.scss";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(ReduxThunk, LocalStorageAPI.saveTokenMiddleware)
  )
);
/* eslint-enable */

const token = LocalStorageAPI.load("token");
if (token) {
  store.dispatch(asyncActions.getUser(token));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
