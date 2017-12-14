import React from 'react';
import { render } from 'react-dom';

import ProjectViewContainer from './containers/ProjectViewContainer';

class ProjectViewApp extends React.Component {
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
      <ProjectViewContainer projectId={projectId}/>
    )
  }
}

render(<ProjectViewApp/>, document.getElementById('ProjectView'))
