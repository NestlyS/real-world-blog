import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions'
import { bindActionCreators } from 'redux'

import ErrorBlock from '../../ErrorBlock';
import ArticleWrapper from '../../Article';
import cl from './SingleArticle.module.scss';
import CustomSpin from '../../CustonSpin';

function SingleArticle ({ articleId, article, loading, error, loadArticle }) {
    useEffect(() => {
        if ( !article || article.slug !== articleId) {
            loadArticle(articleId);
        }
    }, []);
    if (error) {
        return <ErrorBlock>Couldn't load an article. Try again later</ErrorBlock>;
    }
    if (loading) {
        return <CustomSpin/>;
    }
    return (
        <div className={cl['single-article']}>
            <ArticleWrapper article={article} extended/>
        </div>
    );
};

SingleArticle.propTypes = {
    articleId: PropTypes.string.isRequired,
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
    }).isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    loadArticle: PropTypes.func.isRequired
};

SingleArticle.defaultProps = {
    loading: false,
    error: null,
    article: null
};

const mapStateToProps = (state) => ({
    article: state.article.data,
    loading: state.article.loading,
    error: state.article.error
});

const mapDispatchToProps = (dispatch) => {
    const { loadArticle } = bindActionCreators(actions, dispatch);
    return { loadArticle };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);
