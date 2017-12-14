import React from 'react'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Rating from './Rating';

export default class ReviewBlurb extends React.Component {
  static propTypes = {
    clientName: PropTypes.string,
    rating: PropTypes.number,
    image: PropTypes.string,
    reviewText: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  render() {
    let rating = [];
    for (let i = 0; i < this.props.rating; i++)
      rating.push(<FontAwesome key={`star[${i}]`} className="star" name="star" />);
    for (let i = 0; i < 5-this.props.rating; i++)
      rating.push(<FontAwesome key={`empty[${i}]`} className="star" name="star-o" />);

    return (
      <div className="review-blurb">
          <div className="row">
            <div className="col-sm-2 picture">
              <img src={this.props.image} className="review-picture"/>
            </div>
            <div className="col-sm-10 review">
              <div className="row">
                <div className="col-sm-5">
                  <span className="text-main">{this.props.clientName}</span>
                </div>
                <div className="col-sm-1">
                  <span className="text-main">Rating</span>
                </div>
                <div className="col-sm-4 rating">
                  <Rating rating={this.props.rating} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 review-description">
                  <span>{this.props.reviewText}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
