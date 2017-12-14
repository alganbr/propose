import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Form, TextField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';

import Navbar from '../components/Navbar';

const applyProjectSchema = new Schema({
  message: {
    login: String,
    required: true
  }
})
export default class ProjectViewContainer extends React.Component {
  static propTypes = {
    projectsId: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {project: {}, user: {},modalIsOpen: false}
  }

   componentDidMount() {
    let component = this
    console.log('In component did mount', component.props)
    let url = "/api/projects/" + component.props.projectId.toString();

    let settings = {
        method: "GET",
        credentials: 'same-origin'
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "Looking at data")
          component.setState({project:data});
        });

    const userUrl = "/api/profile/"
    fetch(userUrl, settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "looking at user data")
        component.setState({user:data})
      })
  }

  _renderSkills = (project) => {
    if (!project.tags) {
      return <span/>;
    }
    const skills = project.tags.map(tag => {
      return <li>{tag.name}</li>
    })
    return (
      <ul>
        {skills}
      </ul>
      )
  }

  openModel = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

    onSubmit = (model) => {
        var headers = new Headers();

        headers.append('Accept', 'application/json'); // This one is enough for GET requests
        headers.append('Content-Type', 'application/json'); // This one sends body
        const applyUrl = "/api/applications/"
        const details = {
            details: {
                   project: this.state.project.id,
                   freelancer: this.state.user.id,
                   client: this.state.project.client.id,
                   message: model.message,
               }};
        console.log("looking at the detials", details)
        const settings = {
            method: "POST",
            credentials: 'same-origin',
            headers: headers,
            body: JSON.stringify(details)
        };
        fetch(applyUrl,  settings)
            .then((response) => response.json())
            .then((data) => {})
        this.setState({modalIsOpen: false})

    }

  render() {
    console.log(this.state)
    let clientName = "";
    if (this.state.project && this.state.project.client && this.state.project.client.user) {
      clientName = this.state.project.client.user.first_name + " " + this.state.project.client.user.last_name;
    }
    return (
      <div>
      <Navbar />
      <Grid fluid>
        <Row>
          <Col xs>
            <h3>{this.state.project.title}</h3>
            <Row>
              <Col xs>
                {"by" + " " + clientName}
              </Col>
              <Col xs>
                <button onClick={this.openModel}>Apply</button>
              </Col>
            </Row>
            <span/>

            <span/>
            <h4>Project Summary</h4>
            {this.state.project.description}

          </Col>
          <Col xs>
            <h3>Similar Projects</h3>
            <hr/>
            <h3>Skills</h3>
            <hr/>
            {this._renderSkills(this.state.project)}
          </Col>

        </Row>
      </Grid>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={() => {}}
        onRequestClose={this.closeModal}
        contentLabel="Application Form"
                ariaHideApp={false}
      >
        <h3>Project Application</h3>
                <Form
                    onSubmit={this.onSubmit}
                    onError={(errors, model) => console.log('error', errors, model)}>
                    <TextField name="message" label="Message" type="text"/>
                    <SubmitField value="Submit"/>
                </Form>
      </Modal>
      </div>

    )
  }
}
