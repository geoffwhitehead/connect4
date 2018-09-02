import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import PlayerList from "components/PlayerList";

const client = new ApolloClient({
  uri: GRAPHQL_URI
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   "Access-Control-Allow-Origin": "http://localhost:4000/",
  //   "Access-Control-Allow-Headers": "origin"
  // }
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       "Access-Control-Allow-Origin": "http://localhost:4000",
  //       "Access-Control-Allow-Headers": "origin"
  //     }
  //   });
  // }
});

const Root = () => (
  <ApolloProvider client={client}>
    <div>Connect 4</div>
    <PlayerList />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector("#root"));
