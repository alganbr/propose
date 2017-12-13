import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';

export default class ProjectViewContainer extends React.Component {
	static propTypes = {
		projectsId: PropTypes.number,
	}

	constructor(props) {
	  super(props)
	  this.state = {project: {}, user: {}}
	}

	 componentDidMount() {
	  let component = this
	  console.log('In component did mount', component.props)
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

	  const userUrl = "/api/profile/"
	  fetch(userUrl, settings) 
	  	.then((response) => response.json())
	  	.then((data) => {
	  		console.log(data, "looking at user data")
	  		component.setState({user:data})
	  	})
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

	render() {
		console.log(this.state)
		let clientName = "";
		if (this.state.project && this.state.project.client && this.state.project.client.user) {
			clientName = this.state.project.client.user.first_name + " " + this.state.project.client.user.last_name;
		}
		return (
			<Grid fluid>
			  <Row>
			    <Col xs>
			    	<h3>{this.state.project.title}</h3>
			    	<Row>
			    		<Col xs>
			    			{"by" + " " + clientName}
			    		</Col>
			    		<Col xs>
			    			<button>Apply</button>
			    		</Col>
			    	</Row>
			    	<span/>

			    	<span/>
			    	<h4>Project Summary</h4>
			    	{this.state.project.description}

			    </Col>
			    <Col xs>
			    	<h3>Similar Projects</h3>
			    	<hr/>
			    	<h3>Skills</h3>
			    	<hr/>
			    	{this._renderSkills(this.state.project)}
			    </Col>
			  </Row>
			</Grid>
		)
	}

}