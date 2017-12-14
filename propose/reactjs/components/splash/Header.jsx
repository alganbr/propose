import React from 'react';

export default class Header extends React.Component {
  render() {
    return(
      <header className="masthead bg-primary text-white text-center">
        <div className="container">
        <h1 className="text-uppercase mb-0">Propose.me</h1>
        <h2 className="font-weight-light mb-0">Propose a project, and we'll do the rest.</h2>
        </div>
      </header>
    );
  }
}
