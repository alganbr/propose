import React from 'react';
import { render } from 'react-dom';

import ProjectSearchContainer from './containers/ProjectSearchContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/search.scss';

class ProjectSearch extends React.Component {
  render() {
    return (
      <ProjectSearchContainer />
    )
  }
}

render(<ProjectSearch/>, document.getElementById('ProjectSearch'))
