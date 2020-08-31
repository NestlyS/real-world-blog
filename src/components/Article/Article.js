import React from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

import avatar from "../../assets/avatar.svg";
import cl from "./Article.module.scss";

const Article = ({
  title,
  description,
  authorName,
  authorAvatar,
  authorCreatedAt,
  renderTagButtons,
  renderControlButtons,
  favorited,
  likes,
  body,
  slug,
  favoriteArticle,
  unfavoriteArticle,
}) => {
  return (
    <article className={cl.block}>
      <div className={cl.header}>
        <Link to={`articles/${slug}/`} className={cl.title}>
          {title}
        </Link>
        <LikeButton
          isLiked={favorited}
          likesCount={likes}
          like={favoriteArticle}
          unlike={unfavoriteArticle}
        />
        <div className={cl["tag-field"]}>{renderTagButtons}</div>
      </div>
      <div className={cl["author-info"]}>
        <div className={cl["author-name"]}>
          <p className={cl.author}>{authorName}</p>
          <p className={cl.date}>{authorCreatedAt}</p>
        </div>
        <img className={cl.avatar} src={authorAvatar} alt={authorName} />
      </div>
      <p className={cl.description}>{description}</p>
      <div className={cl["control-buttons"]}>{renderControlButtons}</div>
      <div className={cl.body}>
        {body ? <ReactMarkdown source={body} /> : null}
      </div>
    </article>
  );
};

Article.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  authorName: PropTypes.string,
  authorAvatar: PropTypes.string,
  authorCreatedAt: PropTypes.string,
  renderTagButtons: PropTypes.arrayOf(PropTypes.element),
  renderControlButtons: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  likes: PropTypes.number,
  favorited: PropTypes.bool,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  slug: PropTypes.string.isRequired,
  favoriteArticle: PropTypes.func,
  unfavoriteArticle: PropTypes.func,
};

Article.defaultProps = {
  title: "Some article title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  authorName: "John Doe",
  authorAvatar: avatar,
  authorCreatedAt: "March 5, 2020",
  renderTagButtons: [],
  renderControlButtons: null,
  likes: 0,
  favorited: false,
  body: "",
  favoriteArticle: () => {},
  unfavoriteArticle: () => {},
};

export default Article;
