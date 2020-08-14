import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import Article from './Article';

import avatar from '../../assets/avatar.svg';

const defaultState = {
    author: {
        bio: "",
        following: false,
        image: avatar,
        username: 'John Doe'
    },
    title: 'Some article title',
    body: "",
    createdAt: 'March 5, 2020',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    favorited: false,
    favoritesCount: 0,
    tagList: [], 
    updatedAt: ""
};

function ArticleWrapper({ article: art, extended }) {
    const article = art ? art : defaultState;

    const renderTagButtons = (article) => {
        return article.tagList.map((item) => {
            return (
                <button>
                    {item}
                </button>
            )
        })
    }
    return (
        <Article
            title={article.title}
            description={article.description}
            authorName={article.author.username}
            authorAvatar={ article.author.image ? article.author.image : undefined}
            authorCreatedAt={format( new Date(article.createdAt), 'MMMM d, uuuu')}
            renderTagButtons={renderTagButtons(article)}
            likes={article.favoritesCount}
            slug={article.slug}
            body={ extended ? article.body : null}
        />
    )
}

ArticleWrapper.propTypes = {
    article: PropTypes.shape({
        author: PropTypes.shape({
            bio: PropTypes.string,
            following: PropTypes.bool,
            image: PropTypes.string,
            username: PropTypes.string
        }),
        body: PropTypes.string,
        createdAt: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        favorited: PropTypes.bool,
        favoritesCount: PropTypes.number,
        slug: PropTypes.string.isRequired,
        tagList: PropTypes.arrayOf(PropTypes.string), 
        updatedAt: PropTypes.string
    }),
    extended: PropTypes.bool
}

ArticleWrapper.defaultProps = {
    article: defaultState,
    extended: false
}

export default ArticleWrapper;
