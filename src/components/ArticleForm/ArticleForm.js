import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import { InputField, InputTextarea, InputButton } from "../Inputs";
import Tag from "./Tag";
import StatusRender from "../StatusRender";
import { ErrorLine } from "../Error";
import errorMessageBank from "../../ErrorMessageBank";

import formStyles from "../../formStyles.module.scss";
import cl from "./ArticleForm.module.scss";

function ArticleForm({ title, article, loading, error, callback }) {
  const { register, handleSubmit, errors } = useForm();
  let initialTags = article?.tags?.map((text) => ({
    id: uniqueId("tag_"),
    text,
  }));
  if (initialTags === undefined || initialTags?.length === 0) {
    initialTags = [{ id: uniqueId("tag_"), text: "" }];
  }
  const [tags, setTags] = useState(initialTags);
  const onAddNewTag = () =>
    setTags((state) => [...state, { id: uniqueId("tag_"), text: "" }]);
  const onSubmit = (data) => {
    callback(
      data.title,
      data.short,
      data.body,
      tags.map((item) => item.text).filter((text) => text !== "")
    );
  };
  const renderTags = () =>
    tags?.map(({ id, text }) => {
      return <Tag key={id} text={text} id={id} setTags={setTags} />;
    });
  return (
    <form
      method="post"
      action="/"
      className={`${formStyles["form-block"]} ${cl.form}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={formStyles["form-title"]}>{title}</h2>
      <StatusRender
        errorBlock={[
          {
            condition: error?.internet,
            block: <ErrorLine>{errorMessageBank.form.internet}</ErrorLine>,
          },
        ]}
        loadingBlock={{
          condition: loading,
        }}
        dataBlock={{
          condition: false,
          block: null,
        }}
      />
      <InputField
        name="title"
        type="text"
        placeholder="Title"
        autocomplete="off"
        value={article?.title}
        errors={errors}
        ref={register({
          required: true,
        })}
      />
      <InputField
        name="short"
        type="text"
        placeholder="Short description"
        autocomplete="off"
        value={article?.short}
        errors={errors}
        ref={register({
          required: true,
        })}
      />
      <InputTextarea
        name="body"
        type="textarea"
        placeholder="Text"
        autocomplete="off"
        errors={errors}
        value={article?.body}
        ref={register({
          required: true,
        })}
      />
      <div className={cl["tags-container"]}>
        <label className={cl.label} htmlFor="tag_last">
          Tags
        </label>
        <div className={cl.tagsBody}>{renderTags()}</div>
        <button
          type="button"
          className={`${cl.button} ${cl.primary}`}
          onClick={onAddNewTag}
        >
          Add tag
        </button>
      </div>
      <div className={cl["submit-button"]}>
        <InputButton type="submit" text="Send" />
      </div>
    </form>
  );
}

ArticleForm.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string,
    short: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

ArticleForm.defaultProps = {
  article: {},
  loading: false,
  error: null,
};

export default ArticleForm;
