/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from "react";

export default function useFinally(isAsyncInProcess, isError, callback) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    /* Если у нас началась загрузка или форма даже незасабмиттена, то ничего не делаем */

    if (isAsyncInProcess || !submitted) {
      return;
    }
    /* Если загрузка закончилась неудачно:
        обнуляем сабмит и требуем нового вызова сабмина */
    if (isError) {
      setSubmitted(false);
      return;
    }
    /* Если загрузка прошла успешно, то просто делаем коллбек */
    callback();
  }, [isError, isAsyncInProcess, submitted]);
  /* Возвращаем рычаг для включения работы хука. 
    Обычно сразу после этого должен активироваться флаг, обозначающий начало
    асинхронной операции. 
    Если он всегда находится в false, то операция срабатывает
    синхронно. */
  return setSubmitted;
}
