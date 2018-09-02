import React, { Component } from "react";

const COLUMNS = 7;
const ROWS = 6;

export default class GameManager extends Component {
  state = {
    playerOne: "",
    playerTwo: "",
    board: []
  };

  initBoard = () => {
    for (let i = 0; i < ROWS; i++) {
      board.push([]);
    }
  };

  addToken = column => {};

  render() {
    const { playerOne, playerTwo, board } = this.state;
    return this.props.render(
      playerOne,
      playerTwo,
      // board,
      // this.initBoard,
      // this.addToken
    );
  }
}
