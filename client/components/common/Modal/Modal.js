import React, { Component } from "react";
import css from "./Modal.scss";
import "./ModalTransition.scss";
import { CSSTransition } from "react-transition-group";

export default class Modal extends Component {
  handleOnClose = () => {
    this.props.onClose();
  };

  render() {
    const { open, children, icon } = this.props;
    return (
      <div>
        <CSSTransition
          unmountOnExit
          in={open}
          timeout={500}
          classNames="modal modal"
        >
          <div className={css.modal}>
            <div className={css.background}>
              <div role="dialog" className={css.dialog}>
                <div className={css.content}>{children}</div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
