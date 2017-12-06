import React from 'react';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="profileSidebar">
        <img src="https://i.imgur.com/R6d7AGE.png" />
        <div className="buttons">
          <button className="btn btn-primary">
            Change Photo
          </button>
          <button className="btn btn-primary">
            Remove Photo
          </button>
        </div>
        <div className="completedProjects">
          Completed Projects
          <br />
          <ul>
            <li>Project Title</li>
            <li>Project Title</li>
            <li>Project Title</li>
            <li>Project Title</li>
            <li>Project Title</li>
          </ul>
        </div>
        <div className="skills">
          Skills
          <br />
          <ul>
            <li>Skill</li>
            <li>Skill</li>
            <li>Skill</li>
            <li>Skill</li>
            <li>Skill</li>
          </ul>
        </div>
      </div>
    )
  }
}
