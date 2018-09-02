import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const query = gql`
  {
    players {
      name
    }
  }
`;

export default class PlayerList extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return <p>{data.players}</p>;
        }}
      </Query>
    );
    // console.log(this.props);
    // return <p>playessr</p>;
  }
}
