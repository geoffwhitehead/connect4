import React from "react";
import Input from "components/common/Input/Input";
import Animation from "react-lottie";
import * as animationData from "assets/animations/dino_dance.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({ next, show, ...rest }) => {
  return show ? (
    <div>
      <Animation
        options={defaultOptions}
        onClick={null}
        isClickToPauseDisabled
        height={200}
        width={200}
      />
      <Input
        {...rest}
        action={{
          color: "teal",
          labelPosition: "right",
          icon: "right arrow",
          content: "Next",
          onClick: next
        }}
      />
    </div>
  ) : null;
};
