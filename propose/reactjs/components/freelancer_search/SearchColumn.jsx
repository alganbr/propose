import React from 'react'; 
import ReactDOM from 'react-dom';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';

import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

class SearchColumn extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
		  projectSize: "small",
		  tags: [
		    { id: 1, name: "Apples" },
		    { id: 2, name: "Pears" }
		  ],
		  suggestions: [
		    { id: 3, name: "Bananas" },
		    { id: 4, name: "Mangos" },
		    { id: 5, name: "Lemons" },
		    { id: 6, name: "Apricots" }
		  ],
		  locationTags: [],
		  locationSuggestions: [
		  	{ id: 1, name: "San Francisco" },
		  	{ id: 2, name: "New York" },
		  	{ id: 3, name: "Chicago" }
		  ]
		}
	}

	onChange = (value) => {
		this.setState({projectSize: value})
	}

	handleDelete = (i) => {
    	const tags = this.state.tags.slice(0)
    	tags.splice(i, 1)
    	this.setState({ tags })
  	}

  	handleAddition = (tag) => {
    	const tags = [].concat(this.state.tags, tag)
    	this.setState({ tags })
  	}

  	render() {
  		return (
  				<div>
  					<h2>Refine Your Search</h2>
  					<h3>Skills</h3>
	  				<div>
	  					Add search tags 
	  				</div>
	  				<ReactTags
	  					tags={this.state.tags}
	  					suggestions={this.state.locationSuggestions}
	  					handleDelete={this.handleDelete}
	  					handleAddition={this.handleAddition} />
	  				<RadioGroup onChange={ this.onChange } horizontal={true} value={this.state.projectSize}>
	  				  <RadioButton value="small" iconSize={20}>
	  				    Small
	  				  </RadioButton>
	  				  <ReversedRadioButton value="medium" iconSize={20}>
	  				    Medium
	  				  </ReversedRadioButton>
	  				  <ReversedRadioButton value="large" iconSize={20}>
	  				    Large
	  				  </ReversedRadioButton>
	  				</RadioGroup>
	  				<h3>Location</h3>
	  				<ReactTags
	  					tags={this.state.tags}
	  					suggestions={this.state.locationSuggestions}
	  					handleDelete={this.handleDelete}
	  					handleAddition={this.handleAddition} />
  				</div>
  			)
  	}


}

export default SearchColumn;