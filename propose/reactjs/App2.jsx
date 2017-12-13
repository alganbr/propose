import React from 'react';
import { render } from 'react-dom';

import FreelancerSearchContainer from './containers/FreelancerSearchContainer';

class App2 extends React.Component {
  render() {
    return (
      <FreelancerSearchContainer />
    )
  }
}

render(<App2/>, document.getElementById('App2'))