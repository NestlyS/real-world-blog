import React, { useState } from "react";
import PropTypes from "prop-types";

import cl from "./Article.module.scss";
import exclamation from "../../assets/exclamation.svg";

function Modal({ onAgree, onCancel }) {
  return (
    <div className={cl["modal-body"]}>
      <div className={cl["modal-header"]}>
        <img src={exclamation} alt="Exclamation sing" />
        <span>Are you sure to delete this article?</span>
      </div>
      <div className={cl["modal-buttons"]}>
        <button
          type="button"
          className={`${cl.button} ${cl["button-small"]} ${cl["button-secondary"]}`}
          onClick={() => onCancel()}
        >
          No
        </button>
        <button
          type="button"
          className={`${cl.button} ${cl["button-small"]} ${cl["button-primary"]}`}
          onClick={() => onAgree()}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

Modal.defaultProps = {
  onCancel: () => {},
  onAgree: () => {},
};

function useModal({ onAgree }) {
  const [modalVisibile, setModalVisible] = useState(false);
  const modal = modalVisibile ? (
    <Modal onAgree={onAgree} onCancel={() => setModalVisible(false)} />
  ) : null;
  return [modal, setModalVisible];
}

export default useModal;
