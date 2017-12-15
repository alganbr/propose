import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export default class Sidebar extends React.Component {
  static propTypes = {
    profilePicture: PropTypes.string,
    skills: PropTypes.array,
    profile: PropTypes.boolean,
  }

  render() {
    let skills = [];
    this.props.skills.map((skill) => {
      skills.push(<li key={`skill[${skill.id}]`}>{skill.name}</li>);
    });

    let buttons = [];
    if (this.props.profile) {
      buttons.push(
        <div className="buttons">
          <button className="btn btn-primary">
            <FontAwesome
              className="btn-icon"
              name="pencil"
            />
            Change Photo
          </button>
          <button className="btn btn-primary">
            <FontAwesome
              className="btn-icon"
              name="trash"
            />
            Remove Photo
          </button>
        </div>
      );
    }

    return (
      <div className="sidebar">
        <img src={this.props.profilePicture} className="profile-picture"/>
        {buttons}
        <div className="completed-projects">
          <h4>Completed Projects</h4>
          <ul>
            <li>Project Title</li>
            <li>Project Title</li>
            <li>Project Title</li>
            <li>Project Title</li>
            <li>Project Title</li>
          </ul>
        </div>
        <div className="skills">
          <h4>Skills</h4>
          <ul>
            {skills}
          </ul>
        </div>
      </div>
    )
  }
}
