import React from 'react';
import PropTypes from 'prop-types';

import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import SearchColumn from '../components/freelancer_search/SearchColumn';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class ClientProjectContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectFilter: 'none'
    }
  }

  // componentDidMount() {
  //  let component = this
  //  let url = "/api/projects"
  //  let settings = {
  //    method: "GET",
  //    credentials: 'same-origin'
  //  }

  //  fetch(url, settings)
  //    .then((response) => response.json())
  //    .then((data) => {
  //      console.log(data)
  //      component.setState({projects:data})
  //    })
  // }

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
     <div>
     <div className="container">
       <div className="row">
         <div className="col-sm-12">
           <Navbar />
         </div>
       </div>
     </div>
     <Grid fluid>
       <Row>
         <Col xs>
           <h3>View Projects</h3>
           <ul>
             <li>Saved</li>
             <li>Pending</li>
             <li>Invites</li>
             <li>Completed</li>
           </ul>
         </Col>
         <Col xs>
           {this._renderCardsTwoColumn(this.state.projects)}
         </Col>
       </Row>
     </Grid>
     </div>

    );
  }

}
