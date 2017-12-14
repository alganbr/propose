import React from 'react'
import PropTypes from 'prop-types';

class WorkInfo extends React.Component {
  static propTypes = {
    phone: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  render() {
    let email = [];
    if (this.props.email)
      email.push(<a href={`mailto:${this.props.email}`} target="_blank">{this.props.email}</a>);
    else
      email.push("No Email.");

    let facebook = [];
    if (this.props.facebook)
      facebook.push(<a href={this.props.facebook} target="_blank">facebook.com</a>);
    else
      facebook.push("No Facebook.");

    let twitter = [];
    if (this.props.twitter)
      twitter.push(<a href={this.props.twitter} target="_blank">twitter.com</a>);
    else
      twitter.push("No Twitter.");

    let website = [];
    if (this.props.website)
      website.push(<a href={this.props.website} target="_blank">website.com</a>);
    else
      website.push("No website.");

    return (
      <div className="work-info">
        <div className="row">
          <div className="col-sm-3 table-header">
            Phone
          </div>
          <div className="col-sm-9 table-content">
            {this.props.phone}
          </div>
          <div className="col-sm-3 table-header">
            Email
          </div>
          <div className="col-sm-9 table-content">
            {email}
          </div>
          <div className="col-sm-3 table-header">
            Facebook
          </div>
          <div className="col-sm-9 table-content">
            {facebook}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 table-header">
            Twitter
          </div>
          <div className="col-sm-9 table-content">
            {twitter}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 table-header">
            Website
          </div>
          <div className="col-sm-9 table-content">
            {website}
          </div>
        </div>
      </div>
    )
  }
}

export default WorkInfo;
