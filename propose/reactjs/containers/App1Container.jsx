import React from 'react';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import ReviewBlurb from '../components/ReviewBlurb';
import WorkInfo from '../components/profile/WorkInfo';

export default class App1Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar />
            <Headline>CS130 Test!</Headline>
            <WorkInfo previousWork={[]} resume="filler" github="filler" linkedin="filler" />
            <ReviewBlurb clientName="John" rating={5} image="test_url" reviewText="Lorem meh"/>
          </div>
        </div>
      </div>
    )
  }
}
