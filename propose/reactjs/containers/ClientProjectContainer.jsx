import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FontAwesome from 'react-fontawesome';

import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import SearchColumn from '../components/freelancer_search/SearchColumn';

export default class ClientProjectContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectFilter: 'none'
    }
  }

  componentDidMount() {
    let component = this;
    let settings = {
      method: "GET",
      credentials: 'same-origin'
    };

    let url = "/api/profile/";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({userId: data.id});
      });

    url = "/api/dashboard/working/";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        let projects = [];
        data.map(project => {
          if (component.state.userId === project.client.id)
            projects.push(project)
        })
        component.setState({projects});
      });
  }

  _renderCardsTwoColumn = (projects) => {
    const cards = projects.map(project => {
      console.log(project)
      return (<ProjectCard project={project} cardType="dashboard"/>);
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
      )
  }

  render() {
    return (
     <div className="client-project">
      <Navbar />
       <Grid fluid>
         {this._renderCardsTwoColumn(this.state.projects)}
       </Grid>
     </div>
    );
  }
}
