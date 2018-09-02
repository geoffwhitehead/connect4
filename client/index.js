import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import PlayerList from "components/PlayerList";
import GameManager from "components/GameManager/GameManager";
import NameInput from "components/common/NameInput/NameInput";
import Title from "components/common/Title/Title";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

const App = () => (
  <ApolloProvider client={client}>
    <Title />
    <PlayerList />
    <GameManager
      render={({
        hasStarted,
        start,
        playerOne,
        playerTwo,
        updateNameOne,
        updateNameTwo
      }) => {
        if (!hasStarted) {
          return <Welcome start={start} />;
        }
        if (!playerOne) {
          return (
            <NameInput
              label="Player One"
              placeholder="Enter your name..."
              onChange={updateNameOne}
              value={playerOne}
            />
          );
        }
        if (!playerTwo) {
          return (
            <NameInput
              label="Player Two"
              placeholder="Enter your name..."
              onChange={updateNameTwo}
              value={playerTwo}
            />
          );
        }
      }}
    />
  </ApolloProvider>
);
render(<App />, document.getElementById("root"));

module.hot.accept();
