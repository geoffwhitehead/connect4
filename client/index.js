import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import GameManager from "components/GameManager/GameManager";
import NameInput from "components/common/NameInput/NameInput";
import Title from "components/common/Title/Title";
import StartScreen from "components/StartScreen/StartScreen";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

const App = () => (
  <ApolloProvider client={client}>
    <Title />
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
          return <StartScreen start={start} />;
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
