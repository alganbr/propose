import React from 'react';
import PropTypes from 'prop-types';

import Mainbar from '../components/profile/Mainbar';
import Navbar from '../components/Navbar';
import Sidebar from '../components/profile/Sidebar';

export default class OtherProfileContainer extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures
  */

  static propTypes = {
    userId: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile_pic: "",
      skills: [],
    }
  }

  componentWillMount() {
    const userURL = "/api/users/" + this.props.userId.toString();
    const settings = {
      method: "GET",
      credentials: 'same-origin',
    };
    const component = this;
    fetch(userURL, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState(data);
        const reviewsURL = `/api/users/${data.id}/review/`;
        fetch(reviewsURL, settings)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            component.setState({reviews: data});
          });
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
                profile={false}
              />
            </div>
            <div className="col-sm-8">
              <Mainbar
                user={this.state}
                profile={false}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
