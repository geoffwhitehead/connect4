import React, { Component } from "react";
import _ from "lodash";

const COLUMNS_COUNT = 7;
const ROWS_COUNT = 6;
const WIN_COUNT = 4;
const RED_PLAYER = 1;
const YELLOW_PLAYER = 2;
const AI_PLAYER = 2;

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
  takeTurn = col => {
    const { turn } = this.state;
    const { ai } = this.props;
    let player = (turn % 2) + 1;

    if (!this.isValidColumn(col)) return false; // if this is an illegal placement - return
    let row = this.findOpenRowPosition(col); // else find the next free row
    this.dropToken(row, col, player); // insert token into board
    if (this.checkWin(row, col, player)) this.setState({ winner: player }); // check if this was a winning move
    this.setState({ turn: turn + 1 }, () => (ai ? this.aiTurn() : null)); // increment the turn counter and initiate AI turn - if AI is playing

    return true;
  };

  // calculates where the best scoring moves are for the selected player
  calculateAIScoringArray = player => {
    let arr = [0, 0, 0, 0, 0, 0, 0];

    for (let col = 0; col < arr.length; col++) {
      if (this.isValidColumn(col)) {
        let row = this.findOpenRowPosition(col);
        let scores = [];
        let pos;

        scores.push(this.aiCheckTokens(player, 0, col, 1, 0, row, col));
        scores.push(this.aiCheckTokens(player, row, 0, 0, 1, row, col));
        pos = this.calcStartXY(row, col);
        scores.push(
          this.aiCheckTokens(player, pos.row, pos.col, 1, 1, row, col)
        );
        pos = this.calcStartXYFlipped(row, col);
        scores.push(
          this.aiCheckTokens(player, pos.row, pos.col, -1, 1, row, col)
        );
        arr[col] = _.max(scores);
      } else {
        arr[col] = -1;
      }
    }
    return arr;
  };

  // iterates over all the methods responsible for an AI turn
  aiTurn = () => {
    const { turn } = this.state;
    let player = (turn % 2) + 1; // determine current player - although for AI this should always equal 2
    let redArray = this.calculateAIScoringArray(RED_PLAYER); // best red moves
    let yellowArray = this.calculateAIScoringArray(YELLOW_PLAYER); // best yellow moves
    let pos = this.determineAIMove(redArray, yellowArray); // determine course of actions based on both players best moves
    this.dropToken(pos.row, pos.col, player); // insert token into board at position

    if (this.checkWin(pos.row, pos.col, player))
      this.setState({ winner: player });
    this.setState({ turn: turn + 1 });
  };

  // based on the best moves available - choose which to do.
  determineAIMove = (redArray, yellowArray) => {
    let col;
    if (_.max(redArray) === 3 && _.max(yellowArray) < 3) {
      col = this.findRandomMax(redArray);
    } else {
      col = this.findRandomMax(yellowArray);
    }

    return { col, row: this.findOpenRowPosition(col) };
  };

  // pick random max value from array and return its index
  findRandomMax = arr => {
    let max = _.max(arr);
    let indexes = arr.reduce((acc, cur, i) => {
      if (cur === max) acc.push(i);
      return acc;
    }, []);
    let random = _.random(indexes.length - 1);
    return indexes[random];
  };

  isOutsideBounds = (row, col) =>
    col >= COLUMNS_COUNT || col <= -1 || row >= ROWS_COUNT || row <= -1;

  // returns true if it finds 4 consecutive tokens
  // rAdj and cAdj are the amounts to increment the row ad column by. This determines the line direction.
  aiCheckTokens = (
    player,
    row,
    col,
    rAdj,
    cAdj,
    stX,
    stY,
    oFlag = false,
    count = 0
  ) => {
    if (row === stX && col === stY) oFlag = true; //have we intersected hitOrigin?
    if (count === WIN_COUNT - 1 && oFlag) return count; // if 3 consequetive tokens and intersected origin
    if (this.isOutsideBounds(row, col)) return count; // hit the edge
    if (this.state.board[row][col] === player) {
      count++;
    } else {
      if (row !== stX || col !== stY) {
        // not occupied by player token and not on origin
        if (oFlag) {
          // if past the origin
          return count;
        } else {
          count = 0; // reset the count
        }
      } else {
      }
    }
    return this.aiCheckTokens(
      player,
      row + rAdj,
      col + cAdj,
      rAdj,
      cAdj,
      stX,
      stY,
      oFlag,
      count
    );
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
    if (this.isOutsideBounds(row, col)) return false;
    this.state.board[row][col] === player ? count++ : (count = 0);
    return this.checkTokens(player, row + rAdj, col + cAdj, rAdj, cAdj, count);
  };

  render() {
    return this.props.render({
      ...this.state,
      takeTurn: this.takeTurn,
      currentPlayer: (this.state.turn % 2) + 1,
      draw: this.state.turn === ROWS_COUNT * COLUMNS_COUNT,
      lose: this.props.ai && this.state.winner === AI_PLAYER
    });
  }
}
