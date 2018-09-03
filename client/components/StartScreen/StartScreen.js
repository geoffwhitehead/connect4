import React from "react";
import PlayerList from "components/PlayerList";
import Directions from "components/common/Directions/Directions";
import NextButton from "components/common/NextButton/NextButton";
import Title from "components/common/Title/Title";

export default ({ next, show }) => {
  return show ? (
    <div>
      <Title />
      <Directions />
      <NextButton text="Start" onClick={next} />
      <PlayerList />
    </div>
  ) : null;
};
