import React from 'react';
import PropTypes from 'prop-types';

import Mainbar from '../components/dashboard/Mainbar';
import Navbar from '../components/Navbar';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
export default class DashProjectContainer extends React.Component {
    static propTypes = {
        projectId: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {project: {}, projectList: [],}
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
                        <Mainbar user={this.state} />
                      </div>
                    </div>
                  </div>
                </div>
            )
    }
}