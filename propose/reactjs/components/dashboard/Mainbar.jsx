import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
    this.state = { tabIndex: 0 };
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
      console.log(comment.comment)
      return <CommentBlurb comment={comment}/>
    })
  }

  render() {
    let fullName = ""
    console.log('in mainbar', this.props)
    if (this.props.project && this.props.project.client && this.props.project.client.user) {
      fullName = this.props.project.client.user.first_name + " " + this.props.project.client.user.last_name }
    let image = "https://i.imgur.com/UyiR4w5.png";
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";
    console.log(this.props)
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
            <h3> TO BE ADDED</h3>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
