import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    hasStarted: false,
    screen: 0
  };

  updateNameOne = val => {
    this.setState({ playerOne: val });
  };

  incrementScreen = () => this.setState({ screen: this.state.screen + 1 });

  render() {
    return this.props.render({
      ...this.state,
      updateNameOne: this.updateNameOne,
      next: this.incrementScreen
    });
  }
}
