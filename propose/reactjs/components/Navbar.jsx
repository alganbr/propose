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
                <li><a href="">Search</a></li>
                {!this.props.login && <li><a href="/login">Login</a></li>}
                {this.props.login && <li> <a href="">Dashboard</a></li>}
                {this.props.login && <li><a href="">Projects</a></li>}
                {
                  this.props.login &&
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">My Account <FontAwesome name="caret-down" /></a>
                    <ul className="dropdown-menu">
                      <li><a href="">Profile</a></li>
                      <li><a href="">Settings</a></li>
                      <li><a href="">Switch to Client Mode</a></li>
                      <li><a href="">Logout</a></li>
                    </ul>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}
