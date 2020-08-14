import { combineReducers } from 'redux';
import * as types from './actionTypes';

const articlesInitialState = {
    loading: false,
    error: null,
    data: [],
    totalPages: 0
}

function articles (state = articlesInitialState , action) {
    switch (action.type) {
        case types.articlesLoading: 
            return { ...state, loading: true, error: null};
        case types.articlesError:
            return { ...state, error: action.payload.error, loading: false};
        case types.articlesData:
            const { articles, totalPages } = action.payload.data;
            return { ...state, data: articles , totalPages: totalPages , loading: false}
        default:
            return state;
    }
}

const articleInitialState = {
    loading: false,
    error: null,
    data: null
}

function article (state = articleInitialState, action) {
    switch (action.type) {
        case types.articleLoading: 
            return { ...state, loading: true, error: null};
        case types.articleError:
            return { ...state, error: action.payload.error, loading: false};
        case types.articleData:
            const { article } = action.payload.data;
            return { ...state, data: article, loading: false}
        default:
            return state;
    }
}

export default combineReducers(
    {
        articles,
        article
    }
);