import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import PlayerList from "components/PlayerList";
import GameManager from "components/GameManager/GameManager";

const client = new ApolloClient();

const App = () => (
  <ApolloProvider client={client}>
    <div>Connect 4</div>
    <PlayerList />
    <GameManager render={val => <p>asdasd {val}</p>} />
  </ApolloProvider>
);
render(<App />, document.getElementById("root"));
