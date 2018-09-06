import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    screen: 0,
    ai: false
  };

  updateNameOne = val => this.setState({ playerOne: val });

  updateNameTwo = val => this.setState({ playerTwo: val });

  incrementScreen = () => this.setState({ screen: this.state.screen + 1 });

  handleRestart = () => this.setState({ screen: 0 });

  handleToggleAI = () => this.setState({ ai: !this.state.ai });

  render() {
    return this.props.render({
      ...this.state,
      updateNameOne: this.updateNameOne,
      updateNameTwo: this.updateNameTwo,
      next: this.incrementScreen,
      onRestart: this.handleRestart,
      toggleAI: this.handleToggleAI
    });
  }
}
