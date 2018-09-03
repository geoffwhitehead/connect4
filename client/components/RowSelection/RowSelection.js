import React from "react";
import css from "./RowSelection.css";

export default ({ selectColumn }) => {
  const rows = () => {
    let columns = [];
    for (let i = 0; i < 6; i++) {
      columns.push(
        <div className={css.column} onClick={() => selectColumn(i)} />
      );
    }
    return columns;
  };

  return <div className={css.grid}>{rows()}</div>;
};
