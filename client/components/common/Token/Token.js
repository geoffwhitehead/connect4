import React from "react";
import css from "./Token.scss";

export default ({ player }) => {
  const style = player === 1 ? css.one : css.two;
  return <div className={`${style} ${css.token} ${css.active}`} />;
};
