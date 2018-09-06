import React from "react";
import css from "./RowSelection.scss";
import Animation from "react-lottie";
import * as animationData from "assets/animations/mappoint.json";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({ selectColumn, disabled }) => {
  const handleSelect = index => !disabled && selectColumn(index);

  const rows = () => {
    let columns = [];
    for (let i = 0; i < 7; i++) {
      columns.push(
        // <div className={css.column} onClick={handleSelect.bind(this, i)}>
        //   {/* <Animation
        //     options={defaultOptions}
        //     onClick={null}
        //     isClickToPauseDisabled
        //     height={75}
        //     width={75}
        //   /> */}
        // </div>
        // <div className={css.column} onClick={handleSelect.bind(this, i)}>
        <ButtonAnimatedIcon
          iconName="angle double down"
          text="Drop"
          onClick={handleSelect.bind(this, i)}
        />
        // </div>
      );
    }
    return columns;
  };

  return <div className={css.grid}>{rows()}</div>;
};
