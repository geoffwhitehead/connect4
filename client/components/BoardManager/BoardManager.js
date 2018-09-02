import React, { Component } from "react";

const COLUMNS = 7;
const ROWS = 6;

export default class BoardManager extends Component {
  state = {
    board: []
  };

  initBoard = () => {
    for (let i = 0; i < ROWS; i++) {
      board.push([]);
    }
  };

  addToken = column => {};

  render() {
    return this.props.render(
      { ...this.state, addToken: this.addToken }
      // this.initBoard,
      // this.addToken
    );
  }
}
