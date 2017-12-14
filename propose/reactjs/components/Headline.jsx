import React from "react";
import PropTypes from 'prop-types';

export default class Headline extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    return (
      <h1 className={this.props.className}>{ this.props.children }</h1>
    )
  }
}
