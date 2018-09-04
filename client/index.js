import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import GameManager from "components/GameManager/GameManager";
import NameInput from "components/common/NameInput/NameInput";
import StartScreen from "components/StartScreen/StartScreen";
import BoardManager from "components/BoardManager/BoardManager";
import GameBoard from "components/GameBoard/GameBoard";
import RowSelection from "components/RowSelection/RowSelection";
import Nav from "components/Nav/Nav";
import WinnerText from "components/WinnerText/WinnerText";
import ModalPortal from "components/common/Modal/Portal";
import PlayerList from "components/PlayerList";

import css from "./index.scss";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

class App extends React.Component {
  state = {
    scoresOpen: false
  };

  render() {
    console.log("scores ", this.state.scoresOpen);
    return (
      <ApolloProvider client={client}>
        <div className={css.grid}>
          <Nav />
          <div className={css.main}>
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
                  <div className={css.innerGrid}>
                    <div className={css.content}>
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
                            render={({ board, addToken, winner }) => {
                              return (
                                <div>
                                  <RowSelection
                                    disabled={winner}
                                    selectColumn={addToken}
                                  />
                                  <GameBoard disabled={winner} board={board} />

                                  <ModalPortal
                                    open={winner}
                                    // onClose={this.toggleAuthority}
                                  >
                                    <WinnerText
                                      // onClose={this.toggleAuthority}
                                      onClickScores={() =>
                                        this.setState({ scoresOpen: true })
                                      }
                                    />
                                  </ModalPortal>
                                  <ModalPortal
                                    open={this.state.scoresOpen}
                                    // onClose={this.toggleAuthority}
                                  >
                                    <PlayerList />
                                  </ModalPortal>
                                </div>
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
render(<App />, document.getElementById("root"));

module.hot.accept();
