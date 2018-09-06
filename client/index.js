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
    const { scoresOpen, gameOverOpen } = this.state;
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
                  onRestart,
                  ai,
                  toggleAI
                }) => {
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
                          onToggle={toggleAI}
                          isToggled={ai}
                          toggleLabel="Enable AI"
                        />
                        {screen === 3 && (
                          <div>
                            <BoardManager
                              show={screen === 3}
                              ai={ai}
                              render={({
                                board,
                                takeTurn,
                                winner,
                                currentPlayer,
                                draw,
                                lose
                              }) => {
                                const playerName =
                                  currentPlayer === 1 ? playerOne : playerTwo;
                                const winnerName =
                                  winner === 1
                                    ? playerOne || "P01"
                                    : playerTwo || "P02";

                                const gameOver = winner || draw || lose;
                                return (
                                  <div>
                                    <TurnDisplay
                                      name={playerName}
                                      player={currentPlayer}
                                    />
                                    <RowSelection
                                      disabled={gameOver}
                                      selectColumn={takeTurn}
                                    />
                                    <GameBoard
                                      disabled={gameOver}
                                      board={board}
                                    />

                                    <ModalPortal
                                      open={gameOver && gameOverOpen}
                                    >
                                      <GameOver
                                        winnerName={winnerName}
                                        onClickScores={this.toggleScoresModal}
                                        onClose={this.toggleGameOverModal}
                                        onRestart={onRestart}
                                        draw={draw}
                                        lose={lose}
                                      />
                                    </ModalPortal>
                                    <ModalPortal open={scoresOpen}>
                                      <Scores
                                        onClose={this.toggleScoresModal}
                                      />
                                    </ModalPortal>

                                    {gameOver && !gameOverOpen ? (
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
