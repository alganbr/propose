import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import PropTypes from 'prop-types';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import FreelancerCard from '../components/FreelancerCard';
import FreelancerResultsContainer from '../components/FreelancerResultsContainer';
import ReviewBlurb from '../components/ReviewBlurb';
import WorkInfo from '../components/profile/WorkInfo';
import { Grid, Row, Col } from 'react-flexbox-grid';


export default class FreelancerSearchContainer extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */

  // componentDidMount() {
  //   let url = "api/users/";

  //   let params = {
  //       username: "foo",
  //       password: "bar",
  //       email: "test@test.com"
  //   };

  //   let settings = {
  //       method: "GET",
  //       // body: params,
  //   };

  //   fetch(url, settings)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let component = this
  //         console.log(data, "Looking at data/")
  //         component.props = {data};
  //       });
  // }

  static propTypes = {
    data: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {users: []}
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
  }

  render() {
    return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar />
            <Headline>Search for a Free Lancer</Headline>
          </div>
        </div>
      </div>
      <FreelancerResultsContainer freelancers={this.state.users}/>
      </div>
    )
  }
}
