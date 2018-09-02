import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    hasStarted: false
  };

  updateNameOne = val => {
    this.setState({ playerOne: val });
  };

  start = () => {
    this.setState({ start: true });
  };

  render() {
    return this.props.render({
      ...this.state,
      updateNameOne: this.updateNameOne,
      start: this.start
    });
  }
}
