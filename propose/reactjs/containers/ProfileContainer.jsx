import React from 'react';

import Mainbar from '../components/profile/Mainbar';
import Navbar from '../components/Navbar';
import Sidebar from '../components/profile/Sidebar';

export default class ProfileContainer extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */

  componentDidMount() {
    let url = "/api/users/";

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
        .then((response) => {
          return response;
        })
        .then((data) => {
          let component = this;
          console.log(data);
          console.log("Looking at data");
          component.props = {data};
        });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar />
            <Sidebar />
            <Mainbar />
          </div>
        </div>
      </div>
    )
  }
}
