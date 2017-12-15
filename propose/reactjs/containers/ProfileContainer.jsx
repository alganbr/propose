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
  constructor(props) {
    super(props);
    this.state = {
      profile_pic: "",
      skills: [],
      userId: 0,
    }
  }

  componentWillMount() {
    let url = "/api/profile/";
    let settings = {
        method: "GET",
        credentials: 'same-origin',
    };
    let component = this;
    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          component.setState(data);
          component.setState({userId: data.id});
        });

    url = `/api/users/${this.state.userId}/review/`;
    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          component.setState({reviews: data});
        });
  }

  render() {
    return (
      <div className="profile">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Sidebar
                profilePicture={this.state.profile_pic}
                skills={this.state.skills}
                profile={true}
              />
            </div>
            <div className="col-sm-8">
              <Mainbar
                user={this.state}
                profile={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
