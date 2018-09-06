import React from "react";
import css from "./TurnDisplay.scss";
import Animation from "react-lottie";
import * as animationData from "assets/animations/loader1.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({ name, player, isAITurn }) => {
  const playerStyle = player === 1 ? css.p1 : css.p2;
  return (
    <div className={css.player}>
      <h1 className={playerStyle}>{name || `P0${player}`}</h1>
      <div className={css.loading}>
        {isAITurn && (
          <Animation
            options={defaultOptions}
            onClick={null}
            isClickToPauseDisabled
            height={75}
            width={350}
          />
        )}
      </div>
    </div>
  );
};
