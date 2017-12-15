import React from 'react';
import { render } from 'react-dom';

import ProposalContainer from './containers/ProposalContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/search.scss';

class Proposal extends React.Component {
  render() {
    return (
      <ProposalContainer />
    )
  }
}

render(<Proposal/>, document.getElementById('Proposal'))