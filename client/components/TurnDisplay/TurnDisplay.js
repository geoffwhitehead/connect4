import React from "react";
import css from "./TurnDisplay.scss";

export default ({ name, player }) => {
  const playerStyle = player === 1 ? css.p1 : css.p2;
  return (
    <div className={css.player}>
      <h1 className={playerStyle}>{name}</h1>
    </div>
  );
};
