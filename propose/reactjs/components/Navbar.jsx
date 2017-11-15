import React from "react"

export default class Navbar extends React.Component {
  render() {
    return (
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
              </button>
              <a className="navbar-brand page-scroll" href="#page-top">Propose.me</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="">Search</a>
                </li>
                <li>
                  <a href="">Dashboard</a>
                </li>
                <li>
                  <a href="">Projects</a>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">My Account <i className="fa fa-caret-down"></i></a>
                  <ul className="dropdown-menu">
                    <li><a href="">Profile</a></li>
                    <li><a href="">Settings</a></li>
                    <li><a href="">Switch to Client Mode</a></li>
                    <li><a href="">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}
