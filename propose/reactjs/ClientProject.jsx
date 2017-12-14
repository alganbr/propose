import React from 'react';
import { render } from 'react-dom';

import ClientProjectContainer from './containers/ClientProjectContainer';

import './styles/global.scss';
import './styles/navbar.scss';

class ClientProject extends React.Component {
  render() {
    return (
      <ClientProjectContainer />
    )
  }
}

render(<ClientProject/>, document.getElementById('ClientProject'))
