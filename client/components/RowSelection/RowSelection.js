import React from "react";
import css from "./RowSelection.scss";

export default ({ selectColumn, disabled }) => {
  const handleSelect = index => !disabled && selectColumn(index);

  const rows = () => {
    let columns = [];
    for (let i = 0; i < 7; i++) {
      columns.push(
        <div className={css.column} onClick={handleSelect.bind(this, i)} />
      );
    }
    return columns;
  };

  return <div className={css.grid}>{rows()}</div>;
};
