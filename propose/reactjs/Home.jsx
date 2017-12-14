import React from 'react';
import { render } from 'react-dom';

import HomeContainer from './containers/HomeContainer';

import './styles/global.scss';
import './styles/navbar.scss';

class Home extends React.Component {
  render() {
    return (
      <HomeContainer />
    )
  }
}

render(<Home/>, document.getElementById('home'))
