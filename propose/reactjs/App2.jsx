import React from 'react';
import { render } from 'react-dom';

import ProjectSearchContainer from './containers/ProjectSearchContainer';

class App2 extends React.Component {
  render() {
    return (
      <ProjectSearchContainer />
    )
  }
}

render(<App2/>, document.getElementById('App2'))