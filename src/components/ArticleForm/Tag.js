import React from "react";
import PropTypes from "prop-types";
import CustomInput from "../CustomInput";

import cl from "./ArticleForm.module.scss";

function Tag({ text, id, setTags }) {
  const onChangeTagName = (event) => {
    const { value } = event.target;
    setTags((state) => {
      return state.map((tag) => {
        if (id === tag.id) {
          return { id: tag.id, text: value };
        }
        return tag;
      });
    });
  };
  const onDeleteTag = () => {
    setTags((state) => {
      return state.filter((item) => id !== item.id);
    });
  };
  return (
    <div className={cl.tagField}>
      <CustomInput
        type="text"
        name={`tag_${text}`}
        value={text}
        placeholder="Tag"
        onChange={onChangeTagName}
        short
      />
      <button
        type="button"
        className={`${cl.button} ${cl.danger}`}
        onClick={onDeleteTag}
      >
        Delete
      </button>
    </div>
  );
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setTags: PropTypes.func.isRequired,
};

export default Tag;
