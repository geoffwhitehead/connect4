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
import GameOver from "components/GameOver/GameOver";
import ModalPortal from "components/common/Modal/Portal";
import Scores from "components/Scores/Scores";
import TurnDisplay from "components/TurnDisplay/TurnDisplay";
import ErrorBoundary from "components/common/ErrorBoundary/ErrorBoundary";
import Button from "components/common/Button/Button";

import css from "./index.scss";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

class App extends React.Component {
  state = {
    scoresOpen: false,
    gameOverOpen: true
  };

  toggleScoresModal = () =>
    this.setState({ scoresOpen: !this.state.scoresOpen });

  toggleGameOverModal = () =>
    this.setState({ gameOverOpen: !this.state.gameOverOpen });

  render() {
    console.log("scores ", this.state.scoresOpen);
    return (
      <ApolloProvider client={client}>
        <div className={css.grid}>
          <Nav />
          <div className={css.main}>
            <ErrorBoundary>
              <GameManager
                render={({
                  next,
                  playerOne,
                  playerTwo,
                  updateNameOne,
                  updateNameTwo,
                  screen,
                  onRestart
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
                              ai={true}
                              render={({
                                board,
                                addToken,
                                winner,
                                currentPlayer
                              }) => {
                                const playerName =
                                  currentPlayer === 1 ? playerOne : playerTwo;
                                const winnerName =
                                  winner === 1
                                    ? playerOne || "P01"
                                    : playerTwo || "P02";
                                return (
                                  <div>
                                    <TurnDisplay
                                      name={playerName}
                                      player={currentPlayer}
                                    />
                                    <RowSelection
                                      disabled={winner}
                                      selectColumn={addToken}
                                    />
                                    <GameBoard
                                      disabled={winner}
                                      board={board}
                                    />

                                    <ModalPortal
                                      open={winner && this.state.gameOverOpen}
                                    >
                                      <GameOver
                                        winnerName={winnerName}
                                        onClickScores={this.toggleScoresModal}
                                        onClose={this.toggleGameOverModal}
                                        onRestart={onRestart}
                                      />
                                    </ModalPortal>
                                    <ModalPortal open={this.state.scoresOpen}>
                                      <Scores
                                        onClose={this.toggleScoresModal}
                                      />
                                    </ModalPortal>

                                    {winner && !this.state.gameOverOpen ? (
                                      <Button
                                        text="Show menu"
                                        onClick={this.toggleGameOverModal}
                                      />
                                    ) : null}
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
            </ErrorBoundary>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
render(<App />, document.getElementById("root"));

module.hot.accept();
