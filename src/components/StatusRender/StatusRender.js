import React from "react";
import PropTypes from "prop-types";
import CustomSpin from "../CustonSpin";

/* Каждый блок состоит из свойства condition, условия для вывода блока, и block, самого блока */
/* Позволяет кастомно настроить отображение ошибки, значка спина и вывода даты */

function StatusRender({ errorBlock, loadingBlock, dataBlock }) {
  /* Проверка, прислали сверху один блок с условием и блоком ошибки или несколько */
  let errorBlockArray = errorBlock;
  if (!Array.isArray(errorBlock)) {
    errorBlockArray = [errorBlock];
  }
  /* Если хотя бы одно из условий ошибки выполняется - выводится блок с ошибкой */
  for (const singleErrorBlock of errorBlockArray) {
    if (singleErrorBlock.condition) {
      return singleErrorBlock.block;
    }
  }
  /* Если условие загрузки выполняется, 
    то выводим введенный блок обозначения загрузки или же дефолтный */
  if (loadingBlock.condition) {
    return loadingBlock.block || <CustomSpin />;
  }
  if (dataBlock.condition) {
    return dataBlock.block;
  }
  return null;
}

StatusRender.propTypes = {
  errorBlock: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        condition: PropTypes.bool,
        block: PropTypes.node,
      })
    ),
    PropTypes.shape({
      condition: PropTypes.bool,
      block: PropTypes.node,
    }),
  ]),
  loadingBlock: PropTypes.shape({
    condition: PropTypes.bool,
    block: PropTypes.node,
  }),
  dataBlock: PropTypes.shape({
    condition: PropTypes.bool,
    block: PropTypes.node,
  }),
};

StatusRender.defaultProps = {
  errorBlock: [],
  loadingBlock: {
    condition: false,
  },
  dataBlock: {
    condition: false,
  },
};

export default StatusRender;
