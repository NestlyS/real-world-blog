import { combineReducers } from "redux";
import * as types from "./ActionTypes";

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
      /* 
      Данные снаружи принимаются в виде объекта из двух полей
      articles - сами статьи
      totalPages - количество страниц 
      */
      const { articles: data, totalPages } = action.payload.data;
      return {
        ...state,
        data,
        totalPages: totalPages || state.data.totalPages,
        loading: false,
      };
    }
    case types.articlesUpdateData:
      /* Проходимся по всему массиву со статьями и находим по slug ту, которую надо заменить
        Важно, чтобы статья лежала в payload */
      // eslint-disable-next-line no-case-declarations
      const newArticles = state.data.map((articleItem) => {
        if (articleItem?.slug === action.payload?.data?.article?.slug) {
          return action.payload?.data?.article;
        }
        return articleItem;
      });
      return { ...state, data: newArticles, loading: false };
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
      /*
      Данные приходят в чистом виде, лежат сразу в payload во избежание лишних оболочек
      */
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
  data: {},
};

function user(state = userInitialState, action) {
  switch (action.type) {
    case types.userLoading:
      return { ...state, loading: true, error: null };
    case types.userError:
      return { ...state, error: action.payload.error, loading: false };
    case types.userData: {
      /* Приходит объект payload c информацией о пользователем */
      const { user: data } = action.payload.data;
      return { ...state, data, loading: false };
    }
    default:
      return state;
  }
}

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case types.setLoggedIn:
      return true;
    case types.setUnloggedIn:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  articles,
  article,
  user,
  isLoggedIn,
});
