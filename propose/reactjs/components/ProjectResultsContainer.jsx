import React from 'react';
import PropTypes from 'prop-types';

import ProjectCard from './ProjectCard';
import SearchColumn from '../components/freelancer_search/SearchColumn';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class ProjectResultsContainer extends React.Component {
  static propTypes = {
    projects: PropTypes.array,
    onSubmit: PropTypes.func,
    component: PropTypes.element,
  }

  constructor(props) {
    super(props)
    this.state=({projects: this.props.projects})
  }

  _renderCardsTwoColumn = (projects) => {
    const cards = projects.map(project => {
      return <ProjectCard project={project}/>;
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
    console.log('Render!')
    return (
      <Grid fluid>
        <Row>
          <Col className="sidebar" xs={4}>
            <SearchColumn onSubmit={this.props.onSubmit} component={this.props.component} tagType="project"/>
          </Col>
          <Col className="mainbar" xs={8}>
            {this._renderCardsTwoColumn(this.props.projects)}
          </Col>
        </Row>
      </Grid>
    )
  }
}
