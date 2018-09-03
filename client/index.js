import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import GameManager from "components/GameManager/GameManager";
import NameInput from "components/common/NameInput/NameInput";
import Title from "components/common/Title/Title";
import StartScreen from "components/StartScreen/StartScreen";
import BoardManager from "components/BoardManager/BoardManager";
import GameBoard from "components/GameBoard/GameBoard";
import RowSelection from "components/RowSelection/RowSelection";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Title />
      <GameManager
        render={({
          next,
          playerOne,
          playerTwo,
          updateNameOne,
          updateNameTwo,
          screen
        }) => {
          console.log("start", playerOne, playerTwo, screen);

          return (
            <div>
              <StartScreen show={screen === 0} next={next} />
              <NameInput
                show={screen === 1}
                label="Player One"
                placeholder="Enter your name..."
                onChange={updateNameOne}
                value={playerOne}
                next={next}
              />
              <NameInput
                show={screen === 2}
                label="Player Two"
                placeholder="Enter your name..."
                onChange={updateNameTwo}
                value={playerTwo}
                next={next}
              />
              {screen === 3 && (
                <div>
                  <BoardManager
                    show={screen === 3}
                    render={({ board, addToken }) => {
                      return (
                        <div>
                          <RowSelection selectColumn={addToken} />
                          <GameBoard board={board} />
                        </div>
                      );
                    }}
                  />
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  </ApolloProvider>
);
render(<App />, document.getElementById("root"));

module.hot.accept();
