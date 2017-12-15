import React from 'react';
import PropTypes from 'prop-types';

import Mainbar from '../components/dashboard/Mainbar';
import Navbar from '../components/Navbar';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
export default class DashProjectContainer extends React.Component {
    static propTypes = {
        projectId: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {project: {}, projectList: [], comments: []}
    }

    componentDidMount() {
      let component = this
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
      fetch("/api/projects", settings)
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "Looking at data")
            component.setState({projectList:data});
          });
      const commentUrl = "/api/projects/" + component.props.projectId.toString() + "/comments"
      fetch(commentUrl, settings)
        .then((response) => response.json())
        .then((data) => {
          component.setState({comments: data})
        })
    }

    render() {
        return (
                <div className="profile">
                  <Navbar />
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-4">
                        <h3>Project List Here</h3>
                      </div>
                      <div className="col-sm-8">
                        <Mainbar project={this.state.project} comments={this.state.comments} />
                      </div>
                    </div>
                  </div>
                </div>
            )
    }
}
