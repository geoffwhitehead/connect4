import React from "react";
import css from "./GameOver.scss";
import Button from "components/common/Button/Button";
import ButtonAnimatedIcon from "components/common/ButtonAnimatedIcon/ButtonAnimatedIcon";
import { Mutation } from "react-apollo";
import { PROCESS_WINNER } from "graphql/mutations";
import Animation from "react-lottie";
import * as animationData from "assets/animations/trophy.json";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class GameOver extends React.Component {
  render() {
    const { winnerName, onClickScores, onClose } = this.props;
    return (
      <Mutation mutation={PROCESS_WINNER}>
        {(processWinner, { data, loading, error, called, client, ...rest }) => {
          !called &&
            processWinner({ variables: { name: winnerName } }).then(() =>
              client.resetStore()
            );
          return (
            <div className={css.text}>
              <Animation
                options={defaultOptions}
                onClick={null}
                isClickToPauseDisabled
                height={155}
                width={350}
              />
              <h1>{`${winnerName} wins!`}</h1>
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
