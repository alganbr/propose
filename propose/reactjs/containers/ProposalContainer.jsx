import React from 'react';
import PropTypes from 'prop-types';

import ProjectCard from '../components/ProjectCard';

import Navbar from '../components/Navbar';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class ProposalContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {proposals: [], user: {}}
    }


    componentDidMount() {
      let component = this;
      let profileUrl = "/api/profile";
      let settings = {
          method: "GET",
          credentials: 'same-origin',
      };

      fetch(profileUrl, settings)
          .then((response) => response.json())
          .then((data) => {
            component.setState({user: data});
          });
      let url = "/api/projects"
      fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          component.setState({proposals:data})
        })
    }

    _renderCardsTwoColumn = (projects) => {
      const user = this.state.user;
      const validUserId = user && user.user 
      const cards = projects.map(project => {
        if (project && project.client && project.client.id && validUserId && project.client.id === user.id) {
          return <ProjectCard project={project}/>;
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
            <Grid fluid>
              <Row>
                <Col className="mainbar" xs={12}>
                  {this._renderCardsTwoColumn(this.state.proposals)}
                </Col>
              </Row>
            </Grid>
        )
    }
}