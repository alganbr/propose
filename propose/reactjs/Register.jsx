import React from 'react';
import { render } from 'react-dom';

import RegisterContainer from './containers/RegisterContainer';

class Register extends React.Component {
  render() {
    return (
      <RegisterContainer />
    )
  }
}

render(<Register/>, document.getElementById('register'))
