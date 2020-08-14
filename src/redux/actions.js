import { getArticles, getArticle } from '../utils/RealWorldAPI';
import * as types from './actionTypes';

export const loadArticles = ( page = 1 ) => async (dispatch) => {
    try {
        dispatch({type: types.articlesLoading });
        const data = await getArticles( page );
        dispatch({type: types.articlesData , payload: { data }});
    } catch (error) {
        dispatch({type: types.articlesError , payload: { error}})
    }
}

export const loadArticle = ( articleId ) => async (dispatch) => {
    try {
        dispatch({type: types.articleLoading });
        const data = await getArticle( articleId );
        dispatch({type: types.articleData , payload: { data }});
    } catch (error) {
        dispatch({type: types.articleError , payload: { error}})
    }
}