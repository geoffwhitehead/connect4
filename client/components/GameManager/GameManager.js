import React, { Component } from "react";

const COLUMNS = 7;
const ROWS = 6;

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    board: [],
    hasStarted: false
  };

  initBoard = () => {
    for (let i = 0; i < ROWS; i++) {
      board.push([]);
    }
  };

  addToken = column => {};

  updateNameOne = val => {
    this.setState({ playerOne: val });
  };

  render() {
    return this.props.render(
      { ...this.state, updateNameOne: this.updateNameOne }
      // this.initBoard,
      // this.addToken
    );
  }
}
