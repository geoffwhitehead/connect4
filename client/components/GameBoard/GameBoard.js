import React from "react";
import css from "./GameBoard.css";
import Token from "components/common/Token/Token";

export default ({ board, disabled }) => {
  let style = disabled ? css.disabled : null;
  return (
    <div className={`${css.grid} ${style}`}>
      {board.length > 0 &&
        board
          .slice(0)
          .reverse()
          .map((row, i) =>
            row.map((cell, j) => {
              return (
                <div key={`r${i}c${j}`} className={css.cell}>
                  {cell > 0 ? <Token player={cell} /> : null}
                </div>
              );
            })
          )}
    </div>
  );
};
