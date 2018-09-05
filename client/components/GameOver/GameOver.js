import React from "react";
import css from "./GameOver.scss";
import Button from "components/common/Button/Button";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";
import { Mutation, renderToStringWithData } from "react-apollo";
import { graphql } from "react-apollo";
import { PROCESS_WINNER } from "graphql/mutations";

export default class GameOver extends React.Component {
  render() {
    const { name, onClickScores, onClose } = this.props;
    return (
      <Mutation mutation={PROCESS_WINNER}>
        {(processWinner, { data, loading, error, called, ...rest }) => {
          !called && processWinner({ variables: { name: name } });
          return (
            <div className={css.text}>
              <h1>{`${name} wins!`}</h1>
              <h2>Congratulations</h2>
              {data && (
                <p>{`you now have ${data.processWinner.wins} ${
                  data.processWinner.wins > 1 ? "wins!" : "win!"
                }`}</p>
              )}
              <div>
                <Button text="View high scores" onClick={onClickScores} />
                <ButtonAnimatedIcon
                  iconName="redo"
                  text="Restart"
                  loading={loading}
                  onClick={onClose}
                />
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
