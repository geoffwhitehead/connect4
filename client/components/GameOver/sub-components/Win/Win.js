import React from "react";
import Animation from "react-lottie";
import * as animationData from "assets/animations/trophy.json";
import css from "./Win.scss";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({ winnerName, wins }) => {
  return (
    <div className={css.win}>
      <Animation
        options={defaultOptions}
        onClick={null}
        isClickToPauseDisabled
        height={155}
        width={350}
      />
      <h1>{`${winnerName} wins!`}</h1>
      <h2>Congratulations</h2>
      <p>{`you now have ${wins} ${wins > 1 ? "wins!" : "win!"}`}</p>
    </div>
  );
};
