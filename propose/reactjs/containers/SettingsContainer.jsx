import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextField, TextareaField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import Cookies from 'js-cookie';

import Navbar from '../components/Navbar';

export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: "",
        last_name: "",
        email: "",
      },
      resume: "",
      profile_pic: "",
      bio: "",
    }
  }

  componentWillMount() {
    const component = this;
    const settings = {
      method: "GET",
      credentials: 'same-origin'
    };

    const url = "/api/profile/";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({
          bio: component.bio || data.bio,
          profile_pic: component.profile_pic || data.profile_pic,
          resume: data.resume || component.resume,
          user: {
            first_name: component.first_name || data.user.first_name,
            last_name: component.last_name || data.user.last_name,
            email: component.email || data.user.email,
          }
        });
      });
  }

  handleDelete = (i) => {
    const tags = this.state.project.tags.slice(0);
    tags.splice(i, 1);
    let project = Object.assign({}, this.state.project);
    project.tags = tags;
    this.setState({ project })
  }

  handleAddition = (tag) => {
    const tags = [].concat(this.state.project.tags, tag);
    let project = Object.assign({}, this.state.project);
    project.tags = tags;
    this.setState({ project })
  }

  onSubmit = (model) => {
    var headers = new Headers();

    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    const profileURL = `/api/profile/`;

    let user = {
      bio: model.bio || this.state.bio,
      profile_pic: model.profile_pic || this.state.profile_pic,
      resume: model.resume || this.state.resume,
      user: {
        first_name: model.firstName || this.state.user.first_name,
        last_name: model.lastName || this.state.user.last_name,
        email: model.email || this.state.user.email,
      }
    }

    const settings = {
        method: "POST",
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(user)
    };

    fetch(profileURL,  settings)
        .then((response) => response.json())
        .then((data) => {});

    alert("Profile edited!");
    window.location.replace(`/profile/`);
  }

  render() {
    return (
      <div className="settings">
        <Navbar />
        <div className="container">
          <h3>Edit Profile</h3>
          <div className="form">
            <Form
              onSubmit={this.onSubmit}
              onError={(errors, model) => console.log('error', errors, model)}
            >
              <div className="row">
                <div className="col-sm-2">
                  First Name
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="firstName"
                    value={this.state.user.first_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Last Name
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="lastName"
                    value={this.state.user.last_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Email
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="email"
                    value={this.state.user.email}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Biography
                </div>
                <div className="col-sm-10">
                  <TextareaField
                    className="input input-textarea"
                    name="bio"
                    value={this.state.bio}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Link to resume
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="resume"
                    value={this.state.resume}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Link to profile picture
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="profile_pic"
                    value={this.state.profile_pic}
                  />
                </div>
              </div>
              <SubmitField className="btn btn-primary" value="Edit" />
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
