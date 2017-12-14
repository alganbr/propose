import React from 'react';
import { render } from 'react-dom';

import RegisterContainer from './containers/RegisterContainer';

import './styles/global.scss';
import './styles/navbar.scss';

class Register extends React.Component {
  render() {
    return (
      <RegisterContainer />
    )
  }
}

render(<Register/>, document.getElementById('Register'))
