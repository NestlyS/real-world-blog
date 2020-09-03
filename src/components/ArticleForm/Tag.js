import React from "react";
import PropTypes from "prop-types";
import { InputField } from "../Inputs";

import cl from "./ArticleForm.module.scss";

function Tag({ text, id, setTags, disabled }) {
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
    if (disabled) {
      return;
    }
    setTags((state) => {
      return state.filter((item) => id !== item.id);
    });
  };
  return (
    <div className={cl.tagField}>
      <InputField
        type="text"
        name={`tag_${text}`}
        value={text}
        placeholder="Tag"
        onChange={onChangeTagName}
        short
        disabled={disabled}
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
  disabled: PropTypes.bool,
};

Tag.defaultProps = {
  disabled: false,
};

export default Tag;
