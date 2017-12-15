import React from 'react';
import { render } from 'react-dom';

import DashboardContainer from './containers/DashboardContainer';

import './styles/global.scss';
import './styles/navbar.scss';


class Dashboard extends React.Component {
  render() {
    return (
      <DashboardContainer />
    )
  }
}

render(<Dashboard/>, document.getElementById('Dashboard'))
