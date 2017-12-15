import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import PropTypes from 'prop-types';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import FreelancerCard from '../components/FreelancerCard';
import ReviewBlurb from '../components/profile/ReviewBlurb';
import WorkInfo from '../components/profile/WorkInfo';
import { Grid, Row, Col } from 'react-flexbox-grid';


export default class FreelancerSearchContainer extends React.Component {
  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */
  static propTypes = {
    data: PropTypes.array,
    projectId: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {users: [], applications: []}
  }

    componentDidMount() {
    let component = this
    let url = "/api/users/";

    let params = {
        username: "foo",
        password: "bar",
        email: "test@test.com"
    };

    let settings = {
        method: "GET",
        credentials: 'same-origin'
        // body: params,
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "Looking at data")
          component.setState({users:data});
        });

    fetch("/api/applications", settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "Looking at data")
        component.setState({applications:data});
      });

  }

  _renderCardsTwoColumn = (users) => {
    console.log(this.state.users, "users")
    let parsedApps = this.state.applications.map(app => {
      console.log('app', app)
      console.log(app.details.project === 1)
      if (app.details && app.details.project === Number(this.props.projectId)) {
        console.log('EAULQ')
        return app.details.freelancer
      }
      return null
    });
    console.log(parsedApps, 'parsed')
    const cards = users.map(user => {
      for (let i = 0; i<parsedApps.length; i++) {
        if (user.id === parsedApps[i]){
          return (
            <FreelancerCard
              freelancer={user}
            />
          );
        }
      }
      return null;
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
      <div className="freelancer-search">
        <Navbar />
        <div className="container">
          <Headline>View Applicants</Headline>
        </div>
        {this._renderCardsTwoColumn(this.state.users)}
      </div>
    )
  }
}