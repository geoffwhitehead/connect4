import React, { Component } from "react";

const COLUMNS_COUNT = 7;
const ROWS_COUNT = 6;
const WIN_COUNT = 4;

export default class BoardManager extends Component {
  state = {
    board: [],
    turn: 0,
    winner: 0
  };

  // initialize the game board
  componentDidMount() {
    let board = this.state.board;
    for (let i = 0; i < ROWS_COUNT; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0]);
    }
    this.setState({ board: board });
  }

  // inserts a token into the board at the selected position
  dropToken = (row, col, player) => {
    let board = this.state.board;
    board[row][col] = player;
    this.setState({ board });
  };

  // returns true if it is possible to insert another token in the selected column
  isValidColumn = col => this.state.board[ROWS_COUNT - 1][col] === 0;

  // returns the next position where a token can be inserted on the selected column
  findOpenRowPosition = (col, row = 0) => {
    if (this.state.board[row][col] === 0) return row;
    return this.findOpenRowPosition(col, row + 1);
  };

  // returns true if the placement is valid and a token is successfully added to the board
  addToken = col => {
    let player = (this.state.turn % 2) + 1;
    if (!this.isValidColumn(col)) return false;
    let row = this.findOpenRowPosition(col);
    this.dropToken(row, col, player);
    if (this.checkWin(row, col, player)) this.setState({ winner: player });
    this.setState({ turn: this.state.turn + 1 });
    return true;
  };

  checkWin = (row, col, player) => {
    if (this.checkTokens(player, 0, col, 1, 0)) return true; // check Y
    if (this.checkTokens(player, row, 0, 0, 1)) return true; // check X
    let pos = this.calcStartXY(row, col);
    if (this.checkTokens(player, pos.row, pos.col, 1, 1)) return true; // check XY - diagonal up
    pos = this.calcStartXYFlipped(row, col);
    if (this.checkTokens(player, pos.row, pos.col, -1, 1)) return true; // check XY diagonal down
    return false; // no win was found
  };

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

  // returns true if it finds 4 consecutive tokens
  // rAdj and cAdj are the amounts to increment the row ad column by. This determines the line direction
  checkTokens = (player, row, col, rAdj, cAdj, count = 0) => {
    if (count === WIN_COUNT) return true;
    if (col >= COLUMNS_COUNT || col <= -1 || row >= ROWS_COUNT || row <= -1)
      return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.checkTokens(player, row + rAdj, col + cAdj, rAdj, cAdj, count);
  };

  render() {
    return this.props.render({
      ...this.state,
      addToken: this.addToken,
      currentPlayer: (this.state.turn % 2) + 1
    });
  }
}
