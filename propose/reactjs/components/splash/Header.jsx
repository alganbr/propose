import React from 'react';
import Typist from 'react-typist';

export default class Header extends React.Component {
  render() {
    return(
      <header className="masthead text-center">
        <div className="container">
          <img src="https://i.imgur.com/0Qsbhmo.png" />
          <Typist
            className="title"
            blink={true}
            startDelay={2500}
          >
            Welcome to Propose.me
          </Typist>
          <h4>Propose a project, and we'll do the rest.</h4>
        </div>
      </header>
    );
  }
}
