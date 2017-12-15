import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export default class Sidebar extends React.Component {
  static propTypes = {
    profilePicture: PropTypes.string,
    skills: PropTypes.array,
  }

  render() {
    let skills = [];
    this.props.skills.map((skill) => {
      skills.push(<li key={`skill[${skill.id}]`}>{skill.name}</li>);
    });

    return (
      <div className="sidebar">
        <img src="/media/profile_pics/profilepicture.jpg" className="profile-picture"/>
        <div className="completed-projects">
          <h4>Completed Projects</h4>
          <ul>
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
