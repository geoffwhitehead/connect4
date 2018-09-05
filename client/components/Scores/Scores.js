import React from "react";
import { Query } from "react-apollo";
import TopTable from "components/common/TopTable/TopTable";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";
import { TOP_TEN } from "graphql/queries";

export default ({ onClose }) => {
  return (
    <div>
      <h1>High Scores</h1>
      <Query query={TOP_TEN}>
        {({ data, loading, error }) => {
          return (
            data && !loading && !error && <TopTable players={data.topTen} />
          );
        }}
      </Query>
      <ButtonAnimatedIcon iconName="close" text="Close" onClick={onClose} />
    </div>
  );
};
