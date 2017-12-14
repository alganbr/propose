import React from 'react';
import { render } from 'react-dom';

import FreelancerSearchContainer from './containers/FreelancerSearchContainer';

import './styles/global.scss';
import './styles/navbar.scss';

class FreelancerSearch extends React.Component {
  render() {
    return (
      <FreelancerSearchContainer />
    )
  }
}

render(<FreelancerSearch/>, document.getElementById('FreelancerSearch'))
