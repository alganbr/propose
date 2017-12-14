import React from 'react';
import { render } from 'react-dom';

import ClientProjectContainer from './containers/ClientProjectContainer';

class App4 extends React.Component {
  render() {
    return (
      <ClientProjectContainer />
    )
  }
}

render(<App4/>, document.getElementById('App4'))