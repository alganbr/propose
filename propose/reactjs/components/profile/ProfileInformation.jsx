import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Headline from '../Headline';
import Rating from './Rating';

export default class ProfileInformation extends React.Component {
  static propTypes = {
    bio: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    rating: PropTypes.number
  }

  render() {
    return (
      <div className="profile-information">
        <Headline className="name">
          {`${this.props.first_name} ${this.props.last_name}`}
        </Headline>
        <h4>Profile Summary</h4>
        {this.props.bio}
        <h4>Rating</h4>
        <span className="rating">{this.props.rating}/5</span>
        <Rating rating={this.props.rating} size="lg" />
      </div>
    )
  }
}
