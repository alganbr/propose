import React from 'react';
import PropTypes from 'prop-types';

import FreelancerCard from './FreelancerCard';
import SearchColumn from '../components/freelancer_search/SearchColumn';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class FreelancerResultsContainer extends React.Component {
  static propTypes = {
    freelancers: PropTypes.array
  }

  constructor(props) {
    super(props)
  }

  _renderCardsTwoColumn = (users) => {
    const cards = users.map(user => {
      return (
        <FreelancerCard
          name={user.user.first_name + " " + user.user.last_name}
          rating={user.rating}
          reviewCount={109}
          skills={user.skills}
          bio={user.bio}
          tags={[]}
          isTaken={false}
        />
      );
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
      <Grid fluid>
        <Row>
          <Col className="sidebar" xs={4}>
            <SearchColumn/>
          </Col>
          <Col className="mainbar" xs={8}>
            {this._renderCardsTwoColumn(this.props.freelancers)}
          </Col>
        </Row>
      </Grid>
    );
  }

}
