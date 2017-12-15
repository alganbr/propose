import React from 'react';
import { render } from 'react-dom';

import ApplicationsContainer from './containers/ApplicationsContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/search.scss';

class Applications extends React.Component {
  render() {
    return (
      <ApplicationsContainer />
    )
  }
}

render(<Applications/>, document.getElementById('Applications'))
