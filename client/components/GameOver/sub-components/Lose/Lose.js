import React from "react";
import Animation from "react-lottie";
import * as animationData from "assets/animations/unhappy_fries.json";
import css from "./Lose.scss";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({ winnerName }) => {
  return (
    <div className={css.lose}>
      <Animation
        options={defaultOptions}
        onClick={null}
        isClickToPauseDisabled
        height={300}
        width={250}
      />
      <h1>{`${winnerName} wins!`}</h1>
      <h2>Uh oh</h2>
      <p>You lost, try again?</p>
    </div>
  );
};
