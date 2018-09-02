import React, { Component } from "react";

export default class GameManager extends Component {
  state = {
    val: 5
  };

  render() {
    return this.props.render(this.state.val);
  }
}
