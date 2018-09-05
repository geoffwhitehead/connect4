import React from "react";
import Directions from "components/common/Directions/Directions";
import NextButton from "components/common/NextButton/NextButton";
import { TOP_TEN } from "graphql/queries";
import TopTable from "components/common/TopTable/TopTable";
import { Query } from "react-apollo";
import Animation from "react-lottie";
import * as animationData from "assets/animations/lego_loader.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default ({ next, show }) => {
  return show ? (
    <div>
      <Directions />
      <NextButton text="Start" onClick={next} />
      <h1>High Scores</h1>
      <Query query={TOP_TEN}>
        {({ data, loading, error }) => {
          return (
            <div>
              {loading && (
                <Animation
                  options={defaultOptions}
                  onClick={null}
                  isClickToPauseDisabled
                  height={200}
                  width={350}
                />
              )}
              {data &&
                !loading &&
                !error && <TopTable players={data.topTen.slice(0, 5)} />}
            </div>
          );
        }}
      </Query>
    </div>
  ) : null;
};
