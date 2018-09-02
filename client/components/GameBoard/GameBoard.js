import React from "react";
import css from "./GameBoard.css";
import isEmpty from "lodash/isEmpty";

export default ({ board }) => (
  // console.log(board);

  <div className={css.grid}>
    {board.length > 0 &&
      board
        .reverse()
        .map(row => row.map(cell => <div className={css.cell}>{cell}</div>))}
  </div>
);
