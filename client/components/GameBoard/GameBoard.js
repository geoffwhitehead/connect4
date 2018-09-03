import React from "react";
import css from "./GameBoard.css";
import isEmpty from "lodash/isEmpty";
import Token from "components/common/Token/Token";

export default ({ board }) => {
  return (
    <div className={css.grid}>
      {board.length > 0 &&
        board
          .slice(0)
          .reverse()
          .map(row =>
            row.map(cell => {
              return (
                <div className={css.cell}>
                  {cell > 0 ? <Token player={cell} /> : <p>null</p>}
                </div>
              );
            })
          )}
    </div>
  );
};
