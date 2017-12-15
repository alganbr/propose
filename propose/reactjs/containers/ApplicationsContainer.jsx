import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Headline from '../components/Headline';
import ApplicationCard from '../components/ApplicationCard';
import Navbar from '../components/Navbar';

export default class ApplicationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {applications: [], projects: [], user: {}}
  }

  componentDidMount() {
    let component = this;
    let profileURL = "/api/profile/";
    let settings = {
      method: "GET",
      credentials: 'same-origin',
    };

    fetch(profileURL, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({user: data});
      });

    let projectURL ="/api/projects/";
    fetch(projectURL, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({projects: data})
      });

    let applicationsURL = "/api/applications/"
    fetch(applicationsURL, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({applications: data})
      });
  }

  _renderCardsTwoColumn = (applications) => {
    const user = this.state.user;
    const validUserId = user && user.user;
    const component = this;

    const cards = applications.map(application => {
      if (application && application.details.client && application.details.freelancer && validUserId && application.details.freelancer === user.id ) {
        const project = component.state.projects.filter((project) => {
          return project.id === application.details.project
        })
        return (
          <ApplicationCard project={project[0]} application={application}/>
        );
      }
      else {
        return null;
      }
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
      <div className="applications">
        <Navbar />
        <Headline>My Applications</Headline>
        <Grid fluid>
          <Row>
          <Col className="mainbar" xs={12}>
            {this._renderCardsTwoColumn(this.state.applications)}
          </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
