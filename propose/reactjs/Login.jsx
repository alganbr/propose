import React from 'react';
import { render } from 'react-dom';

import LoginContainer from './containers/LoginContainer';

class Login extends React.Component {
  render() {
    return (
      <LoginContainer />
    )
  }
}

render(<Login/>, document.getElementById('login'))
