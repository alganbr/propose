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

  onSubmit = (model, component) => {
    console.log("Called sumit from resultscontainer!")
    // let component = this;
    // let url = "/api/projects/?" + $.param({search_terms: model.search})
    // console.log(url)
    // let settings = {
    //     method: "GET",
    //     credentials: 'same-origin'
    // };

    // fetch(url, settings)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data, "Looking at data")
    //       component.setState({project:data});
    //     });
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
