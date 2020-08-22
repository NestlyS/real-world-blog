import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import App from "./components/App";
import LocalStorageAPI from "./utils/LocalStorageAPI";

import reducer from "./redux/reducer";
import * as actionTypes from "./redux/actionTypes";

import "./index.module.scss";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ReduxThunk, LocalStorageAPI.middleware))
);
/* eslint-enable */

const user = JSON.parse(LocalStorageAPI.load("user"));
store.dispatch({ type: actionTypes.userData, payload: { data: { user } } });

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
