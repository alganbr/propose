import React from 'react';

export default class Header extends React.Component {
    render() {
        return(
            <header class="masthead bg-primary text-white text-center">
              <div class="container">
                <h1 class="text-uppercase mb-0">Propose.me</h1>
                <h2 class="font-weight-light mb-0">Propose a project, and we'll do the rest.</h2>
              </div>
            </header>
        );
    }
}
