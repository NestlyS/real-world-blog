import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import PropTypes from "prop-types";
import Article from "./Article";
import useModal from "./Modal";

import cl from "./Article.module.scss";

import avatar from "../../assets/avatar.svg";

function ArticleWrapper({
  article,
  extended,
  deleteArticle,
  favoriteArticle,
  unfavoriteArticle,
}) {
  const [Modal, setModalVisible] = useModal({ onAgree: deleteArticle });
  const renderTagButtons = () => {
    return article.tagList.map((item) => {
      return (
        <button
          type="button"
          key={`${item}_${article.author.username}_${article.title}`}
        >
          {item}
        </button>
      );
    });
  };
  const renderControlButtons = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalVisible(true)}
          className={`${cl.button} ${cl["button-danger"]}`}
        >
          Delete
        </button>
        {Modal}
        <Link to="edit" className={`${cl.button} ${cl["button-success"]}`}>
          Edit
        </Link>
      </>
    );
  };
  return (
    <Article
      title={article.title}
      description={article.description}
      authorName={article.author.username}
      authorAvatar={article.author.image ? article.author.image : undefined}
      authorCreatedAt={format(new Date(article.createdAt), "MMMM d, uuuu")}
      renderTagButtons={renderTagButtons(article)}
      likes={article.favoritesCount}
      slug={article.slug}
      body={extended && article.body}
      renderControlButtons={extended && deleteArticle && renderControlButtons()}
      favorited={article.favorited}
      favoriteArticle={favoriteArticle}
      unfavoriteArticle={unfavoriteArticle}
    />
  );
}

ArticleWrapper.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      bio: PropTypes.string,
      following: PropTypes.bool,
      image: PropTypes.string,
      username: PropTypes.string,
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    slug: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    updatedAt: PropTypes.string,
  }),
  extended: PropTypes.bool,
  deleteArticle: PropTypes.func,
  favoriteArticle: PropTypes.func,
  unfavoriteArticle: PropTypes.func,
};

ArticleWrapper.defaultProps = {
  article: {
    author: {
      bio: "",
      following: false,
      image: avatar,
      username: "John Doe",
    },
    title: "Some article title",
    body: "",
    slug: "",
    createdAt: "March 5, 2020",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    favorited: false,
    favoritesCount: 0,
    tagList: [],
    updatedAt: "",
  },
  extended: false,
  deleteArticle: () => {},
  favoriteArticle: () => {},
  unfavoriteArticle: () => {},
};

export default ArticleWrapper;
