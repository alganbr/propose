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


export default class App1Container extends React.Component {

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
    let url = "api/users/";

    let params = {
        username: "foo",
        password: "bar",
        email: "test@test.com"
    };

    let settings = {
        method: "GET",
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
    const dummy_lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis diam neque, maximus quis lacus vel, tempor condimentum nisl. Aenean vel enim non sapien consectetur suscipit. Phasellus vel lorem nibh. Aliquam vestibulum convallis interdum. Aenean vitae massa justo. Etiam et laoreet augue, eget vehicula massa. Ut aliquam nec est quis commodo. Vivamus fermentum enim id iaculis dictum. Nam non vulputate mauris.";
    console.log(this.state, "looking at props")
    return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar />
            <Headline>CS130 Test!</Headline>
            <WorkInfo previousWork={[]} resume="filler" github="filler" linkedin="filler" />
            <ReviewBlurb clientName="John" rating={5} image="test_url" reviewText="Lorem meh"/>
            <FreelancerCard name="Freelancer" rating={5} reviewCount={109} skills={[]} description={dummy_lorem} tags={[]} isTaken={false}/>
          </div>
        </div>
      </div>
      <FreelancerResultsContainer freelancers={this.state.users}/>
      </div>
    )
  }
}
