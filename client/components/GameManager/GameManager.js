import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    hasStarted: false,
    screen: 3
  };

  updateNameOne = evt => this.setState({ playerOne: evt.target.value });

  updateNameTwo = evt => this.setState({ playerTwo: evt.target.value });

  incrementScreen = () => this.setState({ screen: this.state.screen + 1 });

  render() {
    return this.props.render({
      ...this.state,
      updateNameOne: this.updateNameOne,
      updateNameTwo: this.updateNameTwo,
      next: this.incrementScreen
    });
  }
}
