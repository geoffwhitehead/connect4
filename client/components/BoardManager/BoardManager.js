import React, { Component } from "react";

const COLUMNS_COUNT = 7;
const ROWS_COUNT = 6;

export default class BoardManager extends Component {
  state = {
    board: [],
    turn: 0
  };

  componentDidMount() {
    let board = this.state.board;
    board.push([0, 1, 2, 1, 1, 2, 2]);
    for (let i = 0; i < ROWS_COUNT - 1; i++) {
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

  isValidColumn = col => {
    return this.state.board[ROWS_COUNT - 1][col] === 0;
  };
  findOpenRowPosition = (col, row = 0) => {
    console.log("FIND ", col, row);
    const { board } = this.state;
    if (board[row][col] === 0) {
      console.log("returning row: ", row);
      return row;
    }
    return this.findOpenRowPosition(col, row + 1);
  };

  addToken = col => {
    console.log("col ", col);
    if (!this.isValidColumn(col)) return false;
    let row = this.findOpenRowPosition(col);
    console.log("ROW: ", row);
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
    // pos = this.calcStartX(row, col);
    // console.log("POS ", , win);
    // check diag down
  };

  calcStartY = (row, col) => ({ row: 0, col });
  calcStartX = (row, col) => ({ row, col: 0 });
  calcStartXY = (row, col) => {
    const min = Math.min(row, col);
    return { row: row - Math.min(row, col), col: col - Math.min(row, col) };
  };
  calcStartXYFlipped = (row, col) => {
    const min = Math.min(ROWS_COUNT - row, COLS - col);
    return { row: row + min, col: col + min };
  };

  isAxisYWin = (player, row, col, count = 0) => {
    // console.log("vert ", count);
    if (count === 4) return true;
    if (row === ROWS_COUNT) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.isAxisYWin(player, row + 1, col, count);
  };

  isAxisXWin = (player, row, col, count = 0) => {
    // console.log("x  ", count);
    if (count === 4) return true;
    if (col === COLUMNS_COUNT) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.isAxisXWin(player, row, col + 1, count);
  };

  // isAxisXWin = (player, row, col, count = 0) => {
  //   console.log("x  ", count);
  //   if (count === 4) return true;
  //   if (col === COLUMNS_COUNT) return false;
  //   this.state.board[row][col] === player ? count++ : (count = 0);
  //   return this.isAxisXWin(player, row, col + 1, count);
  // };

  render() {
    return this.props.render({ ...this.state, addToken: this.addToken });
  }
}
