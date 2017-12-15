import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FontAwesome from 'react-fontawesome';
import RichTextEditor from 'react-rte';
import htmlToText from 'html-to-text';
import Cookies from 'js-cookie';

import About from '../profile/About';
import ProfileInformation from '../profile/ProfileInformation';
import CommentBlurb from './CommentBlurb';
import WorkInfo from '../profile/WorkInfo';

import 'react-tabs/style/react-tabs.scss';

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

  _renderComments = () => {
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
    headers.append('X-CSRFToken', Cookies.get("csrftoken"))
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
    let fullName = "";
    if (this.props.project && this.props.project.client && this.props.project.client.user) {
      fullName = this.props.project.client.user.first_name + " " + this.props.project.client.user.last_name }

    return (
      <div className="mainbar">
        <h3>{this.props.project.title}</h3>
        <span>{"by " + fullName}</span>
        <div>
          {this.props.project.description}
        </div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab><FontAwesome name="info" className="tab-icon" />About</Tab>
            <Tab><FontAwesome name="comments" className="tab-icon" />Comments</Tab>
            <Tab><FontAwesome name="pencil" className="tab-icon" />Update</Tab>
          </TabList>
          <TabPanel>
            <h4>Skills</h4>
            {this._renderSkills(this.props.project)}
          </TabPanel>
          <TabPanel>
            {this._renderComments()}
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
