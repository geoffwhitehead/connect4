import React, { Component } from "react";
import _ from "lodash";

const COLUMNS_COUNT = 7;
const ROWS_COUNT = 6;
const WIN_COUNT = 4;
const RED_PLAYER = 1;
const YELLOW_PLAYER = 2;

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
    const { turn } = this.state;
    const { ai } = this.props;
    let player = (turn % 2) + 1;
    if (!this.isValidColumn(col)) return false;
    let row = this.findOpenRowPosition(col);
    this.dropToken(row, col, player);
    if (this.checkWin(row, col, player)) this.setState({ winner: player });
    console.log("turn: ", turn);
    this.setState({ turn: turn + 1 }, () => {
      // players turn over - if playing with AI, take AI turn before returning
      console.log("CB turn ", turn, " ai ", ai);
      if (ai) {
        this.aiTurn();
      }
    });

    return true;
  };

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

  aiTurn = () => {
    const { turn } = this.state;
    let player = (turn % 2) + 1;
    let redArray = this.calculateAIScoringArray(RED_PLAYER);
    let yellowArray = this.calculateAIScoringArray(YELLOW_PLAYER);

    // for (let col = 0; col < redArray.length; col++) {
    //   if (this.isValidColumn(col)) {
    //     // find open pos
    //     let row = this.findOpenRowPosition(col);
    //     let scores = [];
    //     let pos;
    //     // check current score in this position
    //     // let h = this.aiCalcStartX(board, player, row, col);
    //     scores.push(this.aiCheckTokens(RED_PLAYER, 0, col, 1, 0, row, col));
    //     scores.push(this.aiCheckTokens(RED_PLAYER, row, 0, 0, 1, row, col));
    //     pos = this.calcStartXY(row, col);
    //     scores.push(
    //       this.aiCheckTokens(RED_PLAYER, pos.row, pos.col, 1, 1, row, col)
    //     );

    //     pos = this.calcStartXYFlipped(row, col);
    //     scores.push(
    //       this.aiCheckTokens(RED_PLAYER, pos.row, pos.col, -1, 1, row, col)
    //     );

    //     // console.log(col, ": score: ", score);
    //     redArray[col] = _.max(scores);
    //   } else {
    //     redArray[col] = -1;
    //   }
    // }

    // console.log("red array: ", redArray);

    // for (let col = 0; col < yellowArray.length; col++) {
    //   if (this.isValidColumn(col)) {
    //     // find open pos
    //     let row = this.findOpenRowPosition(col);
    //     let scores = [];
    //     let pos;

    //     // check current score in this position
    //     // let h = this.aiCalcStartX(board, player, row, col);
    //     scores.push(this.aiCheckTokens(YELLOW_PLAYER, 0, col, 1, 0, row, col));
    //     scores.push(this.aiCheckTokens(YELLOW_PLAYER, row, 0, 0, 1, row, col));
    //     pos = this.calcStartXY(row, col);
    //     scores.push(
    //       this.aiCheckTokens(YELLOW_PLAYER, pos.row, pos.col, 1, 1, row, col)
    //     );
    //     pos = this.calcStartXYFlipped(row, col);
    //     scores.push(
    //       this.aiCheckTokens(YELLOW_PLAYER, pos.row, pos.col, -1, 1, row, col)
    //     );
    //     // console.log(col, ": score: ", score);
    //     yellowArray[col] = _.max(scores);
    //   } else {
    //     yellowArray[col] = -1; // position not available
    //   }
    // }
    // console.log("yellow array: ", yellowArray);
    // for red player then yellow player
    // for each column

    // calc start pos vert
    // calc start hoz
    // calc start diag
    // calc start diag flipped

    // find greatest count of consequtive tokens

    // store the result in array. index is column and number is count.

    let pos = this.determineAIMove(redArray, yellowArray);
    this.dropToken(pos.row, pos.col, player);

    if (this.checkWin(pos.row, pos.col, player))
      this.setState({ winner: player });
    this.setState({ turn: turn + 1 });
  };

  determineAIMove = (redArray, yellowArray) => {
    let col;
    if (_.max(redArray) === 3 && _.max(yellowArray) < 3) {
      col = this.findRandomMax(redArray);
    } else {
      col = this.findRandomMax(yellowArray);
    }

    return { col, row: this.findOpenRowPosition(col) };
  };

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

  // aiCalcStartX = (board, player, row, col) => {
  //   let val = board[row][col];
  //   if(this.isOutsideBounds(row, col)) return col + 1;
  //   if(val != player && row !)
  // }

  // returns true if it finds 4 consecutive tokens
  // rAdj and cAdj are the amounts to increment the row ad column by. This determines the line direction
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
    let stop = false;
    if (row === stX && col === stY) oFlag = true; //have we intersected hitOrigin?
    if (count === WIN_COUNT - 1 && oFlag) return count; // if 3 consequetive tokens and intersected origin
    if (this.isOutsideBounds(row, col)) return count; // hit the edge
    if (this.state.board[row][col] === player) {
      console.log("1: ", "inc counter");
      count++;
    } else {
      console.log("2: ", "dont inc counter");
      console.log(" ----- board ", this.state.board[row][col], player);
      console.log(" ----- vals ", row, stX, col, stY, oFlag, " cnt ", count);
      if (row !== stX || col !== stY) {
        console.log("3: ", "not origin");

        // not occupied by player token and not on origin
        if (oFlag) {
          console.log("4: ", "origin flagged already");

          // if past the origin
          console.log("---- ");
          stop = true;
          // return count;
        } else {
          // were currently before origin
          console.log("5: ", "reset count");
          count = 0; // reset the count
        }
      } else {
        console.log("6: ", "is origin");
      }
    }
    console.log("---- ");
    if (stop) return count;
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
