import React from 'react';
import { render } from 'react-dom';

import ProjectApplicantsContainer from './containers/ProjectApplicantsContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/search.scss';

class ProjectApplicants extends React.Component {
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
      <ProjectApplicantsContainer projectId={projectId}/>
    )
  }
}

render(<ProjectApplicants/>, document.getElementById('ProjectApplicants'))