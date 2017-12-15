import React from 'react';
import { render } from 'react-dom';

import DashboardProjectContainer from './containers/DashboardProjectContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/profile.scss';

class DashboardProject extends React.Component {
  render() {
    const splitHref = window.location.href.split("/")
    const cleanHref = new Array();
    for (let i = 0; i< splitHref.length; i++) {
      if (splitHref[i]) {
        cleanHref.push(splitHref[i])
      }
    }
    const projectId = cleanHref[cleanHref.length - 1];
    return (
      <DashboardProjectContainer projectId={projectId}/>
    )
  }
}

render(<DashboardProject/>, document.getElementById('DashboardProject'))