import React from 'react';

import Headline from '../components/Headline';
import Navbar from '../components/Navbar';
import ReviewBlurb from '../components/ReviewBlurb';
import WorkInfo from '../components/profile/WorkInfo';

export default class App1Container extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */

  componentDidMount() {
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
          let component = this
          console.log(data, "Looking at data/")
          component.props = {data};
        });
  }

  render() {
    console.log(this.props, "looking at props")
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar />
            <Headline>CS130 Test!</Headline>
            <WorkInfo previousWork={[]} resume="filler" github="filler" linkedin="filler" />
            <ReviewBlurb clientName="John" rating={5} image="test_url" reviewText="Lorem meh"/>
          </div>
        </div>
      </div>
    )
  }
}
