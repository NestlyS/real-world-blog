import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import App from './components/App';

import reducer from './redux/reducer';

import './index.module.scss';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ReduxThunk))
);
/* eslint-enable */


ReactDOM.render(
  (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  )
  ,
  document.getElementById('root')
);