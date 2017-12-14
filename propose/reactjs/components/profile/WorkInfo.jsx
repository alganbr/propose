import React from 'react'
import PropTypes from 'prop-types';

export default class WorkInfo extends React.Component {
  static propTypes = {
    previousWork: PropTypes.array,
    resume: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    let resume = [];
    if (this.props.resume)
      resume.push(<a href={this.props.resume} target="_blank">resume.pdf</a>);
    else
      resume.push("No resume.");

    let github = [];
    if (this.props.github)
      github.push(<a href={this.props.github} target="_blank">github.com</a>);
    else
      github.push("No GitHub.");

    let linkedin = [];
    if (this.props.linkedin)
      linkedin.push(<a href={this.props.linkedin} target="_blank">linkedin.com</a>);
    else
      linkedin.push("No LinkedIn.");

    return (
      <div className="work-info">
        <div className="row">
          <div className="col-sm-3 table-header">
            Resume
          </div>
          <div className="col-sm-9 table-content">
            {resume}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 table-header">
            GitHub
          </div>
          <div className="col-sm-9 table-content">
            {github}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 table-header">
            LinkedIn
          </div>
          <div className="col-sm-9 table-content">
            {linkedin}
          </div>
        </div>
      </div>
    )
  }
}
