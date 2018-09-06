import React from "react";
import Input from "components/common/Input/Input";
import Animation from "react-lottie";
import Checkbox from "components/common/Checkbox/Checkbox";
import css from "./NameInput.scss";
import * as animationData from "assets/animations/dino_dance.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({
  next,
  show,
  isToggled,
  onToggle,
  toggleLabel,
  onChange,
  ...rest
}) => {
  const handleChange = evt => {
    evt.target.value.length < 4 && onChange(evt.target.value.toUpperCase());
  };
  const handleToggle = evt => {
    isToggled
      ? handleChange({ target: { value: "" } })
      : handleChange({ target: { value: "AI" } });
    onToggle();
  };
  return show ? (
    <div className={css.input}>
      <Animation
        options={defaultOptions}
        onClick={null}
        isClickToPauseDisabled
        height={200}
        width={200}
      />
      <Input
        {...rest}
        onChange={handleChange}
        action={{
          color: "teal",
          labelPosition: "right",
          icon: "right arrow",
          content: "Next",
          onClick: next
        }}
      />
      {onToggle && (
        <div className={css.toggle}>
          <Checkbox
            toggle
            label={toggleLabel}
            checked={isToggled}
            onClick={handleToggle}
          />
        </div>
      )}
    </div>
  ) : null;
};
