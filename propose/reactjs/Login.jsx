import React from 'react';
import { render } from 'react-dom';

import LoginContainer from './containers/LoginContainer';

import './styles/global.scss';
import './styles/navbar.scss';

class Login extends React.Component {
  render() {
    return (
      <LoginContainer />
    )
  }
}

render(<Login/>, document.getElementById('Login'))
