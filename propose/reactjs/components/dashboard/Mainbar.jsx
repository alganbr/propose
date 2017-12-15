import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RichTextEditor from 'react-rte';

import About from '../profile/About';
import ProfileInformation from '../profile/ProfileInformation';
import CommentBlurb from './CommentBlurb';
import WorkInfo from '../profile/WorkInfo';
import htmlToText from 'html-to-text';

import 'react-tabs/style/react-tabs.scss';

  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

export default class Mainbar extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    comments: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = { tabIndex: 0, value: RichTextEditor.createEmptyValue() };
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

  _renderReviewBlurbs = () => {
    return this.props.comments.map(comment => {
      return <CommentBlurb comment={comment}/>
    })
  }

  onChange = (value) => {
    this.setState({value})
  }

  onSubmit = () => {
    var text = htmlToText.fromString('<h1>Hello World</h1>', {
      wordwrap: 130
    });
    var headers = new Headers();
    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('X-CSRFToken', getCookie("csrftoken"))
    const convertedText = htmlToText.fromString(this.state.value.toString('html'));
    const commentUrl = "/api/projects/" + this.props.project.id.toString() + "/comments"
    const details = {
      user: this.props.project.client.id,
      comment: convertedText,
      project: this.props.project.id.toString(),
    }

    const settings = {
      method: "POST",
      credentials: 'same-origin',
      headers: headers,
      body: JSON.stringify(details)
    }
    fetch(commentUrl,  settings)
      .then((response) => response.json())
      .then((data) => {})
  }

  render() {
    let fullName = ""
    if (this.props.project && this.props.project.client && this.props.project.client.user) {
      fullName = this.props.project.client.user.first_name + " " + this.props.project.client.user.last_name }
    let image = "https://i.imgur.com/UyiR4w5.png";
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";
    return (
      <div className="mainbar">
        <h3>{this.props.project.title}</h3>
        <span>{"by " + fullName}</span>
        <div>
          {this.props.project.description}
        </div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab>About</Tab>
            <Tab>Comments</Tab>
            <Tab>Update</Tab>
          </TabList>
          <TabPanel>
            <h4>Skills</h4>
            {this._renderSkills(this.props.project)}
          </TabPanel>
          <TabPanel>
            {this._renderReviewBlurbs()}
          </TabPanel>
          <TabPanel>
            <RichTextEditor
              value={this.state.value}
              onChange={this.onChange}/>
            <button onClick={this.onSubmit}> Submit</button>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
