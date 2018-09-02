import React from "react";
import PlayerList from "components/PlayerList";
import Directions from "components/common/Directions/Directions";
import NextButton from "components/common/NextButton/NextButton";

export default ({ next, show }) => {
  return show ? (
    <div>
      <Directions />
      <NextButton text="Start" onClick={next} />
      <PlayerList />
    </div>
  ) : null;
};
