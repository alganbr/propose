import React from 'react';
import { render } from 'react-dom';

import ProjectNewContainer from './containers/ProjectNewContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/project.scss';

class ProjectNew extends React.Component {
  render() {
    const splitHref = window.location.href.split("/")
    const cleanHref = new Array();
    for (let i = 0; i< splitHref.length; i++) {
      if (splitHref[i]) {
        cleanHref.push(splitHref[i])
      }
    }
    const projectId = cleanHref[cleanHref.length - 2];
    return (
      <ProjectNewContainer projectId={projectId}/>
    )
  }
}

render(<ProjectNew/>, document.getElementById('ProjectNew'))
