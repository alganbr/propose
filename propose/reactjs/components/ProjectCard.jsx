import React from 'react'
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";

export default class ProjectCard extends React.Component {
  static propTypes = {
    project: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const project = this.props.project
    const projectUrl = "/projects/" + project.id.toString();
    return (
      <a href={projectUrl}>
      <Card>
        <CardBody>
          <div>
            {project.title}
          </div>
          <div>
            {project.compensation.value + " " + project.compensation.currency}
          </div>
          <div>
            {project.description}
          </div>
        </CardBody>
      </Card>
      </a>
    )
  }
}
