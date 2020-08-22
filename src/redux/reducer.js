import { combineReducers } from "redux";
import * as types from "./actionTypes";

const articlesInitialState = {
  loading: false,
  error: null,
  data: [],
  totalPages: 0,
};

function articles(state = articlesInitialState, action) {
  switch (action.type) {
    case types.articlesLoading:
      return { ...state, loading: true, error: null };
    case types.articlesError:
      return { ...state, error: action.payload.error, loading: false };
    case types.articlesData: {
      const { articles: data, totalPages } = action.payload.data;
      return { ...state, data, totalPages, loading: false };
    }
    default:
      return state;
  }
}

const articleInitialState = {
  loading: false,
  error: null,
  data: null,
};

function article(state = articleInitialState, action) {
  switch (action.type) {
    case types.articleLoading:
      return { ...state, loading: true, error: null };
    case types.articleError:
      return { ...state, error: action.payload.error, loading: false };
    case types.articleData: {
      const { article: data } = action.payload.data;
      return { ...state, data, loading: false };
    }
    default:
      return state;
  }
}

const userInitialState = {
  loading: false,
  error: null,
  data: null,
};

function user(state = userInitialState, action) {
  switch (action.type) {
    case types.userLoading:
      return { ...state, loading: true, error: null };
    case types.userError:
      return { ...state, error: action.payload.error, loading: false };
    case types.userData: {
      const { user: data } = action.payload.data;
      return { ...state, data, loading: false };
    }
    case types.userUnsetError:
      return { ...state, error: null };
    default:
      return state;
  }
}

export default combineReducers({
  articles,
  article,
  user,
});
