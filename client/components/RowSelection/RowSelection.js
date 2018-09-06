import React from "react";
import css from "./RowSelection.scss";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";

export default ({ selectColumn, disabled }) => {
  const handleSelect = index => !disabled && selectColumn(index);

  const rows = () => {
    let columns = [];
    for (let i = 0; i < 7; i++) {
      columns.push(
        <ButtonAnimatedIcon
          disabled={disabled}
          iconName="angle double down"
          text="Drop"
          onClick={handleSelect.bind(this, i)}
        />
      );
    }
    return columns;
  };

  return <div className={css.grid}>{rows()}</div>;
};
