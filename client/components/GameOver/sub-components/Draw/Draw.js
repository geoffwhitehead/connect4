import React from "react";
import Animation from "react-lottie";
import * as animationData from "assets/animations/unhappy_fries.json";
import css from "./Draw.scss";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default () => {
  return (
    <div className={css.draw}>
      <Animation
        options={defaultOptions}
        onClick={null}
        isClickToPauseDisabled
        height={300}
        width={250}
      />
      <h2>Uh oh</h2>
      <p>A draw, try again?</p>
    </div>
  );
};
