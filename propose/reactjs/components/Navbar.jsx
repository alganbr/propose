import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Navbar extends React.Component {
  render() {
    return (
        <nav id="mainNav" className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
              </button>
              <a className="navbar-brand page-scroll" href="/">Propose.me</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/freelancer_search/">Freelancer Search</a>
                </li>
                <li>
                  <a href="/project_search/">Project Search</a>
                </li>
                <li>
                  <a href="/client_project_view/">My Projects</a>
                </li>
                <li>
                  <a href="/proposal/">My Proposals</a>
                </li>
                <li>
                  <a href="">My Applications</a>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">My Account <FontAwesome name="caret-down" /></a>
                  <ul className="dropdown-menu">
                    <li><a href="/profile/">Profile</a></li>
                    <li><a href="/profile/edit/">Settings</a></li>
                    <li><a href="/logout/">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}
