import React from 'react'
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";

export default class FreelancerCard extends React.Component {
  static propTypes = {
  	freelancer: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  truncate(string) {
    if (string.length > 200)
      return string.substring(0, 200)+'...';
    else
      return string;
  };

  render() {
  	console.log(this.props.freelancer)
  	const freelancer = this.props.freelancer;
    let bio ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";
    return (
    <a href={"/user/" + freelancer.id.toString()}>
      <Card className="card">
        <CardBody className="body">
          <span className="name">
            {freelancer.user.first_name + " " + freelancer.user.last_name}
          </span>
          <div className="reviews">
            {freelancer.reviewCount}
          </div>
          <div className="rating">
            <StarRatingComponent
              name="rate1"
              starCount={freelancer.rating}
              emptyStarColor="#ffb400"
            />
          </div>
          <div className="bio">
            {this.truncate(freelancer.bio)}
          </div>
        </CardBody>
      </Card>
      </a>
    )
  }
}
