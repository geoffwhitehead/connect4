import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    screen: 0
  };

  updateNameOne = evt => this.setState({ playerOne: evt.target.value });

  updateNameTwo = evt => this.setState({ playerTwo: evt.target.value });

  incrementScreen = () => this.setState({ screen: this.state.screen + 1 });

  handleRestart = () => this.setState({ screen: 0 });

  render() {
    return this.props.render({
      ...this.state,
      updateNameOne: this.updateNameOne,
      updateNameTwo: this.updateNameTwo,
      next: this.incrementScreen,
      onRestart: this.handleRestart
    });
  }
}
