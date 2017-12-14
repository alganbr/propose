import React from 'react';
import { render } from 'react-dom';

import FreelancerSearchContainer from './containers/FreelancerSearchContainer';

class FreelancerSearch extends React.Component {
  render() {
    return (
      <FreelancerSearchContainer />
    )
  }
}

render(<FreelancerSearch/>, document.getElementById('FreelancerSearch'))
