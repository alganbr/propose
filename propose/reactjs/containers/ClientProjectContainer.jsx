import React from 'react';
import PropTypes from 'prop-types';

import FreelancerCard from '../components/FreelancerCard';
import Navbar from '../components/Navbar';
import SearchColumn from '../components/freelancer_search/SearchColumn';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class ClientProjectContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state=({
			users:[]
		})
	}

	 componentDidMount() {
	  let component = this
	  let url = "/api/users/";

	  let params = {
	      username: "foo",
	      password: "bar",
	      email: "test@test.com"
	  };

	  let settings = {
	      method: "GET",
	      // body: params,
	  };

	  fetch(url, settings)
	      .then((response) => response.json())
	      .then((data) => {
	        console.log(data, "Looking at data")
	        component.setState({users:data});
	      });
	}

	_renderCardsTwoColumn = (users) => {
	  const cards = users.map(user => {
	    console.log(user)
	    return (<FreelancerCard 
	      name={user.user.first_name + " " + user.user.last_name}
	      rating={user.rating}
	      reviewCount={109}
	      skills={user.skills}
	      description={user.bio}
	      tags={[]}
	      isTaken={false}/>);
	  });
	  const leftCol = []
	  const rightCol = []
	  for (var i = 0; i<cards.length; i++) {
	    if (i%2==0) {
	      leftCol.push(cards[i])
	    }
	    else {
	      rightCol.push(cards[i])
	    }
	  }
	  return (
	    <Row>
	      <Col xs> 
	        {leftCol}
	      </Col>
	      <Col xs>
	        {rightCol}
	      </Col>
	    </Row>
	    )
	}

	render() {
		return (
			<div>
			<div className="container">
			  <div className="row">
			    <div className="col-sm-12">
			      <Navbar />
			    </div>
			  </div>
			</div>
			<Grid fluid>
			  <Row>
			    <Col xs> 
			    </Col>
			    <Col xs>
			    	Hello
			    </Col>
			  </Row>
			</Grid>
			</div>

		);
	}

}