import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import PropTypes from 'prop-types';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ProjectResultsContainer from '../components/ProjectResultsContainer';
import ReviewBlurb from '../components/profile/ReviewBlurb';
import WorkInfo from '../components/profile/WorkInfo';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class DashboardContainer extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {projects: []}
  }

  componentWillMount() {
    let component = this
    let url = "/api/projects"
    let settings = {
      method: "GET",
      credentials: 'same-origin'
    }

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        component.setState({projects:data})
      })
  }

  _renderCardsTwoColumn = (projects) => {
    const cards = projects.map(project => {
      return <ProjectCard project={project} cardType="dashboard"/>;
    });
    const leftCol = []
    const rightCol = []
    for (var i = 0; i<cards.length; i++) {
      if (i%2==0) {
        leftCol.push(cards[i])
      }
      else {
        rightCol.push(cards[i])
      }
    }
    return (
      <Row>
        <Col xs>
          {leftCol}
        </Col>
        <Col xs>
          {rightCol}
        </Col>
      </Row>
      );
  }

  render() {
    return (
      <div className="project-search">
        <Navbar />
        <div className="container">
          <Headline>Your Projects</Headline>
          {this._renderCardsTwoColumn(this.state.projects)}
        </div>
      </div>
    )
  }
}