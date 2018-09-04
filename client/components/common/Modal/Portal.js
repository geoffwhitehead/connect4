import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.rootSelector = document.getElementById("root-portal-modal");
    this.container = document.createElement("div");
  }

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(<Modal {...this.props} />, this.container);
  }
}
