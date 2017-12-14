import React from 'react';
import { render } from 'react-dom';

import ProjectSearchContainer from './containers/ProjectSearchContainer';

class ProjectSearch extends React.Component {
  render() {
    return (
      <ProjectSearchContainer />
    )
  }
}

render(<ProjectSearch/>, document.getElementById('ProjectSearch'))
