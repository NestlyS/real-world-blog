import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import cl from "./LikeButton.module.scss";

function LikeButton({ isLiked: initialIsLiked, likesCount, like, unlike }) {
  const [isLiked, setLiked] = useState(initialIsLiked);
  const onClick = () => {
    if (!like || !unlike) {
      return;
    }
    setLiked((liked) => {
      if (liked) {
        unlike();
      } else {
        like();
      }
      return !liked;
    });
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
