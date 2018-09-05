import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    screen: 0
  };

  updateNameOne = evt =>
    evt.target.value.length < 4 &&
    this.setState({ playerOne: evt.target.value.toUpperCase() });

  updateNameTwo = evt =>
    evt.target.value.length < 4 &&
    this.setState({ playerTwo: evt.target.value.toUpperCase() });

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
