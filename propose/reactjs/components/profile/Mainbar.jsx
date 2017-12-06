import React from 'react';

import Headline from '../Headline';
import ReviewBlurb from './ReviewBlurb';
import WorkInfo from './WorkInfo';

export default class Mainbar extends React.Component {
  render() {
    return (
      <div className="profileMainbar">
        <Headline>CS130 Test!</Headline>
        <WorkInfo previousWork={[]} resume="filler" github="filler" linkedin="filler" />
        <ReviewBlurb clientName="John" rating={5} image="test_url" reviewText="Lorem meh"/>
        <ReviewBlurb clientName="John" rating={4} image="test_url" reviewText="Lorem meh"/>
        <ReviewBlurb clientName="John" rating={3} image="test_url" reviewText="Lorem meh"/>
        <ReviewBlurb clientName="John" rating={5} image="test_url" reviewText="Lorem meh"/>
      </div>
    );
  }
}
