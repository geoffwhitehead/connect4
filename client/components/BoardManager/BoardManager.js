import React, { Component } from "react";

const COLUMNS_COUNT = 7;
const ROWS_COUNT = 6;

export default class BoardManager extends Component {
  state = {
    board: [],
    turn: 0
  };

  // initialize the game board
  componentDidMount() {
    let board = this.state.board;
    board.push([0, 1, 2, 1, 1, 2, 2]);
    for (let i = 0; i < ROWS_COUNT - 1; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0]);
    }
    this.setState({ board: board });
    // console.log("mount ", this.state.board);
  }

  // inserts a token into the board at the selected position
  dropToken = (row, col, color) => {
    // console.log("DROP ", col, row);
    // console.log("current board ", this.state.board);
    let board = this.state.board;
    board[row][col] = color;
    this.setState({ board });
    // console.log("BOARD ", board);
  };

  // returns true if it is possible to insert another token in the selected column
  isValidColumn = col => {
    return this.state.board[ROWS_COUNT - 1][col] === 0;
  };

  // returns the next position where a token can be inserted on the selected column
  findOpenRowPosition = (col, row = 0) => {
    // console.log("FIND ", col, row);
    const { board } = this.state;
    if (board[row][col] === 0) {
      // console.log("returning row: ", row);
      return row;
    }
    return this.findOpenRowPosition(col, row + 1);
  };

  // returns true if the placement is valid and a token is successfully added to the board
  addToken = col => {
    // console.log("col ", col);
    if (!this.isValidColumn(col)) return false;
    let row = this.findOpenRowPosition(col);
    // console.log("ROW: ", row);
    let currentPlayer = (this.state.turn % 2) + 1;
    this.dropToken(row, col, currentPlayer);
    this.checkWin(row, col);
    return true;
  };

  checkWin = (row, col) => {
    let currentPlayer = (this.state.turn % 2) + 1;
    // check vertical
    let pos = this.calcStartY(row, col);
    let win = this.isAxisYWin(currentPlayer, pos.row, pos.col);
    console.log("WIN VERT ", win);
    // check horizontal
    pos = this.calcStartX(row, col);
    win = this.isAxisXWin(currentPlayer, pos.row, pos.col);
    console.log("WIN X ", win);
    // check diag up
    pos = this.calcStartXY(row, col);
    // console.log("POS ", row, col, " START: ", pos);
    win = this.isAxisXYWin(currentPlayer, pos.row, pos.col);
    console.log("WIN XY ", win);
    pos = this.calcStartXYFlipped(row, col);
    // console.log("POS ", row, col, " START: ", pos);
    win = this.isAxisXYFlippedWin(currentPlayer, pos.row, pos.col);
    console.log("WIN XYFLIPPED ", win);
    // check diag down
  };

  // returns the first token in the selected column
  calcStartY = (row, col) => ({ row: 0, col });

  // returns the first token in the selected row
  calcStartX = (row, col) => ({ row, col: 0 });

  // returns where either the x or y intersects on the left side of diagonal line
  calcStartXY = (row, col) => {
    const min = Math.min(row, col);
    return { row: row - min, col: col - min };
  };

  // returns where either the x or y intersects on the left side of diagonal line flipped
  calcStartXYFlipped = (row, col) => {
    const min = Math.min(ROWS_COUNT - 1 - row, col);
    return { row: row + min, col: col - min };
  };

  // returns true if it finds 4 consecutive tokens in a vertical line
  isAxisYWin = (player, row, col, count = 0) => {
    // console.log("vert ", count);
    if (count === 4) return true;
    if (this.isOutOfBounds(row, col)) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.isAxisYWin(player, row + 1, col, count);
  };

  // returns true if it finds 4 consecutive tokens in a horizontal line
  isAxisXWin = (player, row, col, count = 0) => {
    // console.log("x  ", count);
    if (count === 4) return true;
    if (this.isOutOfBounds(row, col)) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.isAxisXWin(player, row, col + 1, count);
  };

  // returns true if it finds 4 consecutive tokens in a diagonal line
  isAxisXYWin = (player, row, col, count = 0) => {
    // console.log("x  ", count);
    if (count === 4) return true;
    if (this.isOutOfBounds(row, col)) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.isAxisXYWin(player, row + 1, col + 1, count);
  };

  // returns true if it finds 4 consecutive tokens in a diagonal line flipped.
  isAxisXYFlippedWin = (player, row, col, count = 0) => {
    // console.log("x  ", row, col, count, this.isOutOfBounds(ROWS_COUNT - 1, 1));
    if (count === 4) return true;
    if (this.isOutOfBounds(row, col)) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.isAxisXYFlippedWin(player, row - 1, col + 1, count);
  };

  isOutOfBounds = (row, col) =>
    col >= COLUMNS_COUNT || col <= -1 || row >= ROWS_COUNT || row <= -1;

  render() {
    return this.props.render({ ...this.state, addToken: this.addToken });
  }
}
