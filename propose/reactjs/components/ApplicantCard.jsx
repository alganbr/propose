import React from 'react'
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import Cookies from 'js-cookie';

export default class ApplicantCard extends React.Component {
  static propTypes = {
    freelancer: PropTypes.object,
    application: PropTypes.object,
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

  offer = () => {
    var headers = new Headers();

    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    const offerURL = `/api/applications/${this.props.application.id}/offer/`;

    let offer = {
      details: {
        project: this.props.application.details.project,
        client: this.props.application.details.client,
        freelancer: this.props.application.details.freelancer,
        message: "I'm extending you an offer!",
      },
      id: this.props.application.id
    }

    const settings = {
        method: "POST",
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(offer)
    };

    fetch(offerURL,  settings)
      .then((response) => response.json())
      .then((data) => {});

    alert("Extended offer to freelancer!");
    // window.location.replace(`/applications/${this.props.projectId}/`);
  }

  render() {
    console.log(this.props.freelancer)
    const freelancer = this.props.freelancer;
    let bio ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";
    return (
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
          <div className="buttons">
            <button className="btn btn-primary" onClick={this.offer}>Offer</button>
          </div>
        </CardBody>
      </Card>
    )
  }
}
