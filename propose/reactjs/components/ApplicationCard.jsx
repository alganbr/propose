import React from 'react'
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import FontAwesome from 'react-fontawesome';

export default class ApplicationCard extends React.Component {
  static propTypes = {
    application: PropTypes.object,
    project: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      offer: false,
    }
  }

  truncate(string) {
    if (string) {
      if (string.length > 200)
        return string.substring(0, 200)+'...';
      else
        return string;
    }
  };

  offer = (type) => {
    let offerURL = `/api/applications/${this.props.application.id}/${type}/`;
    let settings = {
      method: "GET",
      credentials: 'same-origin',
    };
    fetch(offerURL, settings)
      .then((response) => response.json())
      .then((data) => {});

    if (type === "decline") {
      alert('Offer declined!');
      window.location.replace(`/applications/`);
    }
    else {
      alert('Offer accepted!');
      window.location.replace(`/dashboards/project/${this.props.application.details.project}/`);
    }
  }

  acceptOffer = () => {
    this.offer("accept");
  }

  declineOffer = () => {
    this.offer("decline");
  }

  render() {
    if (this.props.project && this.props.application) {
      let component = this;
      const project = this.props.project;
      const application = this.props.application;
      let projectURL = "/projects/" + this.props.project.id;
      let status;
      if (this.props.application.is_declined)
        status = "No longer under consideration";
      else
        status = "Under consideration";

      let offerButtons = [];
      let offerURL = `/api/applications/${this.props.application.id}/offer/`;
      let settings = {
        method: "GET",
        credentials: 'same-origin',
      };

      fetch(offerURL, settings)
        .then((response) => {
          if (response.status === 404)
            component.setState({offer: false});
          else
            component.setState({offer: true});
        });

      if (this.state.offer) {
        offerButtons.push(
          <button className="btn btn-warning" onClick={this.declineOffer}>
            Decline
          </button>
        );
        offerButtons.push(
          <button className="btn btn-warning" onClick={this.acceptOffer}>
            Accept
          </button>
        );
      }

      return (
        <Card className="card">
          <CardBody className="body">
            <a href={projectURL} target="_blank">
              <span className="name">
                {project.title}
              </span>
            </a>
            <div className="description">
              {this.truncate(project.description)}
            </div>
            <div className="application-info">
              <br/>
              <strong>Message to Client</strong>: {this.props.application.details.message}<br/>
              <strong>Status</strong>: {status}
            </div>
            <div classname="buttons">
              {offerButtons}
            </div>
          </CardBody>
        </Card>
      )
    }
    return null
  }
}
