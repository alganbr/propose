import React from 'react';

import ProfileInformation from './ProfileInformation';
import ReviewBlurb from './ReviewBlurb';
import WorkInfo from './WorkInfo';

export default class Mainbar extends React.Component {
  render() {
    let image = "https://i.imgur.com/UyiR4w5.png";
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";

    return (
      <div className="mainbar">
        <ProfileInformation
          {...this.props.user.user}
          bio={this.props.user.bio}
          rating={this.props.user.rating}
        />
        <WorkInfo
          previousWork={[]}
          resume={this.props.user.resume}
          github="https://github.com/fkennedy"
          linkedin="https://www.linkedin.com/in/fkennedy0110"
        />
        <ReviewBlurb
          clientName="Lorem ipsum dolor"
          rating={5}
          image={image}
          reviewText={lorem}
        />
        <ReviewBlurb
          clientName="Lorem ipsum dolor"
          rating={4}
          image={image}
          reviewText={lorem}
        />
        <ReviewBlurb
          clientName="Lorem ipsum dolor"
          rating={3}
          image={image}
          reviewText={lorem}
        />
        <ReviewBlurb
          clientName="Lorem ipsum dolor"
          rating={5}
          image={image}
          reviewText={lorem}
        />
      </div>
    );
  }
}
