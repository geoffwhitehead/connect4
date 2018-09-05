import React from "react";
import Directions from "components/common/Directions/Directions";
import NextButton from "components/common/NextButton/NextButton";
import { TOP_TEN } from "graphql/queries";
import TopTable from "components/common/TopTable/TopTable";
import { Query } from "react-apollo";

export default ({ next, show }) => {
  return show ? (
    <div>
      <Directions />
      <NextButton text="Start" onClick={next} />
      <h1>High Scores</h1>
      <Query query={TOP_TEN}>
        {({ data, loading, error }) => {
          return (
            data && !loading && !error && <TopTable players={data.topTen} />
          );
        }}
      </Query>
    </div>
  ) : null;
};
