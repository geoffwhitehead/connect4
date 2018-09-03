import React, { Component } from "react";

const COLUMNS = 7;
const ROWS = 6;

export default class BoardManager extends Component {
  state = {
    board: [],
    turn: 0
  };

  componentDidMount() {
    let board = this.state.board;
    board.push([0, 1, 2, 3, 4, 5, 6]);
    for (let i = 0; i < ROWS - 1; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0]);
    }
    this.setState({ board: board });
  }

  dropToken = (col, row, color) => {
    let board = this.state.board;
    board[row][col] = color;
    this.setState({ board });
  };

  isValidColumn = column => {
    return this.state.board[6][column] !== 0;
  };

  findOpenRowPosition = (column, row = 0) => {
    const { board } = this.state;
    if (board[row][column] === 0) {
      return row;
    }
    this.findOpenRowPosition(column, row + 1);
  };

  addToken = column => {
    if (!this.isValidColumn(column)) return false;
    let row = this.findOpenRowPosition(column);
    this.dropToken(row, column, turn % 2);
    return true;
  };

  render() {
    return this.props.render({ ...this.state, addToken: this.addToken });
  }
}
