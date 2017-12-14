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
    const component = this;
    const url = "/api/projects"
    const settings = {
      method: "GET",
      credentials: 'same-origin'
    }
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({projects: data})
      })
  }

  _renderCardsTwoColumn = (projects) => {
    const cards = projects.map(project => {
      console.log(project)
      return (<ProjectCard project={project}/>);
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
         <Row>
           <Col className="sidebar" xs={3}>
             <h3>View Projects</h3>
             <ul className="projects-list">
              <li className="category">
                <FontAwesome className="icon" name="bookmark" />Saved
              </li>
              <li className="category">
                <FontAwesome className="icon" name="clock-o" />Pending
              </li>
              <li className="category">
                <FontAwesome className="icon" name="envelope-o" />Invites
              </li>
              <li className="category">
                <FontAwesome className="icon" name="check" />Completed
              </li>
             </ul>
           </Col>
           <Col className="mainbar" xs={9}>
             {this._renderCardsTwoColumn(this.state.projects)}
           </Col>
         </Row>
       </Grid>
     </div>
    );
  }
}
