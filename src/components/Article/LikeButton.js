import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import cl from "./LikeButton.module.scss";

function LikeButton({ isLiked, likesCount, like, unlike }) {
  const onClick = () => {
    /* Функций лайка нет - ничего не делаем. */
    if (!like || !unlike) {
      return;
    }
    if (isLiked) {
      unlike();
    } else {
      like();
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames([cl.like], { [cl.liked]: isLiked })}
    >
      {likesCount}
    </button>
  );
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool,
  likesCount: PropTypes.number,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
};

LikeButton.defaultProps = {
  isLiked: false,
  likesCount: 0,
};

export default LikeButton;
