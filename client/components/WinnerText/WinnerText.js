import React from "react";
import css from "./WinnerText.scss";
import Button from "components/common/Button/Button";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";

export default ({ name, onClickScores }) => {
  return (
    <div className={css.text}>
      <h1>{`${name} wins!`}</h1>
      <p>Congratulations, you now have x wins</p>
      <div>
        <Button text="View high scores" onClick={onClickScores} />
        <ButtonAnimatedIcon
          iconName="redo"
          text="Restart"
          onClick={() => console.log("retry")}
        />
      </div>
    </div>
  );
};
