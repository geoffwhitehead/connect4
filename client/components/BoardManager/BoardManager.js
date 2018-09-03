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
    board.push([0, 1, 2, 1, 1, 2, 2]);
    for (let i = 0; i < ROWS - 1; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0]);
    }
    this.setState({ board: board });
    console.log("mount ", this.state.board);
  }

  dropToken = (row, col, color) => {
    console.log("DROP ", col, row);
    console.log("current board ", this.state.board);
    let board = this.state.board;
    board[row][col] = color;
    this.setState({ board });
    console.log("BOARD ", board);
  };

  isValidColumn = column => {
    return this.state.board[ROWS - 1][column] === 0;
  };
  findOpenRowPosition = (column, row = 0) => {
    console.log("FIND ", column, row);
    const { board } = this.state;
    if (board[row][column] === 0) {
      console.log("returning row: ", row);
      return row;
    }
    return this.findOpenRowPosition(column, row + 1);
  };

  addToken = column => {
    console.log("column ", column);
    if (!this.isValidColumn(column)) return false;
    let row = this.findOpenRowPosition(column);
    console.log("ROW: ", row);
    let currentPlayer = (this.state.turn % 2) + 1;
    this.dropToken(row, column, currentPlayer);
    return true;
  };

  render() {
    return this.props.render({ ...this.state, addToken: this.addToken });
  }
}
