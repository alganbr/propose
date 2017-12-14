import React from 'react'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export default class Rating extends React.Component {
  static propTypes = {
    rating: PropTypes.number,
    size: PropTypes.string
  }

  static defaultProps = {
    size: "",
  }

  render() {
    let rating = [];
    if (this.props.size === "") {
      for (let i = 0; i < this.props.rating; i++) {
        rating.push(
          <FontAwesome
            key={`star[${i}]`}
            className="star"
            name="star"
          />
        );
      }
      for (let i = 0; i < 5-this.props.rating; i++) {
        rating.push(
          <FontAwesome
            key={`empty[${i}]`}
            className="star"
            name="star-o"
          />
        );
      }
    }
    else {
      for (let i = 0; i < this.props.rating; i++) {
        rating.push(
          <FontAwesome
            key={`star[${i}]`}
            size={this.props.size}
            className="star"
            name="star"
          />
        );
      }
      for (let i = 0; i < 5-this.props.rating; i++) {
        rating.push(
          <FontAwesome
            key={`empty[${i}]`}
            size={this.props.size}
            className="star"
            name="star-o"
          />
        );
      }
    }
    return rating;
  }
}
