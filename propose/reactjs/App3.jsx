import React from 'react';
import { render } from 'react-dom';

import ProjectSearchContainer from './containers/ProjectSearchContainer';

class App3 extends React.Component {
  render() {
    return (
      <ProjectSearchContainer />
    )
  }
}

render(<App3/>, document.getElementById('App3'))