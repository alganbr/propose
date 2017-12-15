import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextField, TextareaField, SelectField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import ReactTags from 'react-tag-autocomplete';

import Navbar from '../components/Navbar';

export default class ProjectEditContainer extends React.Component {
  static propTypes = {
    projectsId: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      project: {
        title: "",
        compensation: {
          value: "",
          currency: "",
        },
        tags: [],
        description: "",
      },
    }
  }

  componentWillMount() {
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

    console.log(this.props);
    url = `/api/projects/${this.props.projectId}/`;
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        component.setState({ project: data });
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

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    const projectURL = `/api/projects/${this.props.projectId}`;

    let project = Object.assign({}, this.state.project);
    project.title = model.title;
    project.description = model.description;
    project.compensation.currency = model.compensationCurrency;
    project.compensation.value = model.compensationValue;
    project.tags = this.state.tags;

    const details = {
      details: {
        ...project,
      }
    };

    console.log(details);

    const settings = {
        method: "POST",
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(details)
    };

    fetch(projectURL,  settings)
        .then((response) => response.json())
        .then((data) => {})
  }

  render() {
    console.log(this.state);
    return (
      <div className="project-edit">
        <Navbar />
        <div className="container">
          <h3>Project Application</h3>
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
                    value={this.state.project.title}
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
                    value={this.state.project.description}
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
                    value={this.state.project.compensation.currency}
                  />
                  <TextField
                    className="input input-text"
                    name="compensationValue"
                    value={this.state.project.compensation.value}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  Tags
                </div>
                <div className="col-sm-10 tags">
                  <ReactTags
                    tags={this.state.project.tags}
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
