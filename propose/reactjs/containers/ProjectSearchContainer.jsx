import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import PropTypes from 'prop-types';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import FreelancerCard from '../components/FreelancerCard';
import ProjectResultsContainer from '../components/ProjectResultsContainer';
import ReviewBlurb from '../components/profile/ReviewBlurb';
import WorkInfo from '../components/profile/WorkInfo';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class ProjectSearchContainer extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {projects: []}
  }

  componentWillMount() {
    let component = this;
    let settings = {
      method: "GET",
      credentials: 'same-origin'
    };

    let url = "/api/profile";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({userId: data.id});
      });

    url = "/api/projects";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        let projects = [];
        component.setState({projects:data});
      });
  }

  onSubmit = (model, component) => {
  }

  render() {
    console.log(this.state, 'highest tier')
    return (
      <div className="project-search">
        <Navbar />
        <div className="container">
          <Headline>Search for a Project</Headline>
          <ProjectResultsContainer projects={this.state.projects} onSubmit={this.onSubmit} component={this}/>
        </div>
      </div>
    )
  }
}
