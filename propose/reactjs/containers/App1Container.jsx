import React from 'react';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';

export default class App1Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar />
            <Headline>CS130 Test!</Headline>
          </div>
        </div>
      </div>
    )
  }
}
