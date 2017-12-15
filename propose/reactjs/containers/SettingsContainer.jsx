import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextField, TextareaField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import ReactTags from 'react-tag-autocomplete';
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
      bio: "",
      skills: [],
      suggestions: [],
    }
  }

  componentWillMount() {
    const component = this;
    const settings = {
      method: "GET",
      credentials: 'same-origin'
    };

    let url = "/api/profile/";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({
          bio: component.bio || data.bio,
          skills: component.skills || data.skills,
          user: {
            first_name: component.first_name || data.user.first_name,
            last_name: component.last_name || data.user.last_name,
            email: component.email || data.user.email,
          }
        });
      });

    url = "/api/tags/";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({ suggestions: data });
      });
  }

  handleDelete = (i) => {
    const skills = this.state.skills.slice(0);
    skills.splice(i, 1);
    this.setState({ skills })
  }

  handleAddition = (skill) => {
    const skills = [].concat(this.state.skills, skill);
    this.setState({ skills })
  }

  onSubmit = (model) => {
    var headers = new Headers();

    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    const profileURL = `/api/profile/`;

    let user = {
      bio: model.bio || this.state.bio,
      skills: this.state.skills.map(tag => tag.id),
      user: {
        first_name: model.firstName || this.state.user.first_name,
        last_name: model.lastName || this.state.user.last_name,
        email: model.email || this.state.user.email,
      }
    }

    console.log(user);

    const settings = {
        method: "POST",
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(user)
    };

    fetch(profileURL, settings)
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
                  Skills
                </div>
                <div className="col-sm-10 tags">
                  <ReactTags
                    tags={this.state.skills}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition} />
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
