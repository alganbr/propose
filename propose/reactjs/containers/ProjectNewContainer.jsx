import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextField, TextareaField, SelectField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import ReactTags from 'react-tag-autocomplete';
import Cookies from 'js-cookie';

import Navbar from '../components/Navbar';

export default class ProjectNewContainer extends React.Component {
  static propTypes = {
    projectsId: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      tags: [],
    }
  }

  componentWillMount() {
    alert("Project proposed!");
    let component = this;
    let settings = {
      method: "GET",
      credentials: 'same-origin'
    };

    let url = "/api/tags";
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({ suggestions: data });
      });
  }

  handleDelete = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition = (tag) => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }

  onSubmit = (model) => {
    var headers = new Headers();

    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    const projectURL = "/api/projects/";

    let project = {
      title: model.title,
      description: model.description,
      compensation: {
        currency: model.compensationCurrency,
        value: model.compensationValue,
      },
      tags: this.state.tags.map(tag => tag.id)
    }

    const settings = {
        method: "POST",
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(project)
    };

    fetch(projectURL,  settings)
        .then((response) => response.json())
        .then((data) => {});

    alert("Project proposed!");
    window.location.replace("/client_project_view/");
  }

  render() {

    return (
      <div className="project-new">
        <Navbar />
        <div className="container">
          <h3>Propose New Project</h3>
          <div className="form">
            <Form
              onSubmit={this.onSubmit}
              onError={(errors, model) => console.log('error', errors, model)}
            >
              <div className="row">
                <div className="col-sm-2">
                  Project Title
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="title"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Description
                </div>
                <div className="col-sm-10">
                  <TextareaField
                    className="input input-textarea"
                    name="description"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Compensation
                </div>
                <div className="col-sm-10">
                  <TextField
                    className="input input-text"
                    name="compensationCurrency"
                  />
                  <TextField
                    className="input input-text"
                    name="compensationValue"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Tags
                </div>
                <div className="col-sm-10 tags">
                  <ReactTags
                    tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition} />
                </div>
              </div>
              <SubmitField className="btn btn-primary" value="Propose!" />
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
