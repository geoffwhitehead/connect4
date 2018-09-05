import React, { PureComponent } from "react";

export default class ErrorBoundary extends PureComponent {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div>
          <h5>Oops, an error has occured</h5>
          <p>Please refresh your browser to try again</p>
        </div>
      );
    }
    return this.props.children;
  }
}
