import React from "react";
import css from "./Token.css";

export default ({ player }) => {
  const style = player === 1 ? css.one : css.two;
  return <div className={`${style} ${css.token}`}>{player}</div>;
};
