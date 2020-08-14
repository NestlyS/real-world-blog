import axios from 'axios';
import {
    limit // limit = 5 по умолчанию
} from './config';

const baseUrl = "https://conduit.productionready.io/api/";

export async function getArticles ( page = 1 ) {
    const responce = await axios.get(`${baseUrl}articles`, {
        params: {
            limit: limit,
            offset: limit * (page - 1)
            /* limit - сколько за раз выводить постов,
                тогда в зависимости от лимита возвращаются
                сообщения с определенным смещением, причем на
                первой странице смещение = 0. */
        }
    });
    return {
        totalPages: responce.data.articlesCount / limit,
        articles: responce.data.articles,
    };
}

export async function getArticle ( articleId ) {
    const responce = await axios.get( `${baseUrl}articles/${articleId}`);
    return responce.data;
}