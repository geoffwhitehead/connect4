import React from "react";
import css from "./GameOver.scss";
import Button from "components/common/Button/Button";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";
import { Mutation } from "react-apollo";
import { PROCESS_WINNER } from "graphql/mutations";
import Win from "./sub-components/Win/Win";
import Lose from "./sub-components/Lose/Lose";

export default class GameOver extends React.Component {
  render() {
    const {
      winnerName,
      onClickScores,
      onClose,
      onRestart,
      draw,
      lose
    } = this.props;

    return (
      <Mutation mutation={PROCESS_WINNER}>
        {(processWinner, { data, loading, error, called, client, ...rest }) => {
          const shouldSave = winnerName && !lose && !called;
          shouldSave &&
            processWinner({ variables: { name: winnerName } }).then(() =>
              client.resetStore()
            );
          return (
            <div className={css.text}>
              {!draw &&
                !lose && (
                  <Win
                    winnerName={winnerName}
                    wins={
                      !error && !loading && called && data.processWinner.wins
                    }
                  />
                )}
              {draw && <p>Draw</p>}
              {lose && <Lose winnerName={winnerName} />}
              <div className={css.buttons}>
                <Button text="Hide" onClick={onClose} />
                <Button text="View high scores" onClick={onClickScores} />
                <ButtonAnimatedIcon
                  iconName="redo"
                  text="Restart"
                  loading={loading}
                  onClick={onRestart}
                />
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
