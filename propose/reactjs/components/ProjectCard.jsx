import React from 'react'
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import FontAwesome from 'react-fontawesome';

export default class ProjectCard extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    cardType: PropTypes.string,
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
    const project = this.props.project
    let projectUrl = "/projects/" + project.id.toString();
    if (this.props.cardType) {
      if (this.props.cardType == 'dashboard')
        projectUrl = "/dashboards/project/" + project.id.toString();
    } 
    console.log('in project card', project)
    return (
      <a href={projectUrl}>
      <Card className="card">
        <CardBody className="body">
          <span className="name">
            {project.title}
          </span>
          <div>
            <FontAwesome name="usd" className="card-icon compensation" />
            {project.compensation.value + " " + project.compensation.currency}
          </div>
          <div className="description">
            {this.truncate(project.description)}
          </div>
        </CardBody>
      </Card>
      </a>
    )
  }
}
