import React from "react"

export default class Headline extends React.Component {
  render() {
    return (
      <h1 className="header-title">{ this.props.children }</h1>
    )
  }
}
