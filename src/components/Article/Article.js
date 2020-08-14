import React from 'react'
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';

import avatar from '../../assets/avatar.svg';
import cl from './Article.module.scss';


export const Article = ( { 
    title,
    description,
    authorName,
    authorAvatar,
    authorCreatedAt,
    renderTagButtons,
    likes,
    body,
    slug 
} ) => {
    return (
        <article className={cl.article}>
            <div className={cl.header}>
                <Link to={`articles/${slug}`} className={cl.title}>{title}</Link>
                <button className={cl.like}>
                    <HeartOutlined />
                    {likes}
                </button>
                <div className={cl['tag-field']}>
                    { renderTagButtons }
                </div>
            </div>
            <div className={cl['author-info']}>
                <div className={cl['author-name']}>
                    <p className={cl.author}>{authorName}</p>
                    <p className={cl.date}>{authorCreatedAt}</p>
                </div>
                <img className={cl.avatar} src={authorAvatar} alt={authorName}/>
            </div>
            <p className={cl.description}>{description}</p>
            <div className={cl.body}>
                { body ? <ReactMarkdown source={body}/> : null}
            </div>
        </article>
    )
}

Article.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    authorName: PropTypes.string,
    authorAvatar: PropTypes.string,
    authorCreatedAt: PropTypes.string,
    renderTagButtons: PropTypes.arrayOf( PropTypes.element ),
    likes: PropTypes.number,
    slug: PropTypes.string.isRequired
};

Article.defaultProps = {
    title: 'Some article title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    authorName: 'John Doe',
    authorAvatar: avatar,
    authorCreatedAt: 'March 5, 2020',
    renderTagButtons: [],
    likes: 0
};


export default Article;
