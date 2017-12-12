import React from 'react'; 
import ReactDOM from 'react-dom';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';

import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

class SearchColumn extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
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
	  				<div>
	  					Add search tags 
	  				</div>
	  				<h4 style={ { marginTop: 32 } }>Horizontal Radio Buttons</h4>
	  				<RadioGroup onChange={ this.onChange } vertical>
	  				  <RadioButton value="apple">
	  				    Apple
	  				  </RadioButton>
	  				  <RadioButton value="orange">
	  				    Orange
	  				  </RadioButton>
	  				  <ReversedRadioButton value="melon">
	  				    Melon
	  				  </ReversedRadioButton>
	  				</RadioGroup>

	  				<RadioGroup onChange={ this.onChange } horizontal>
	  				  <RadioButton value="small">
	  				    Small
	  				  </RadioButton>
	  				  <ReversedRadioButton value="medium">
	  				    Medium
	  				  </ReversedRadioButton>
	  				  <ReversedRadioButton value="large">
	  				    Large
	  				  </ReversedRadioButton>
	  				</RadioGroup>
	  				<ReactTags
	  					tags={this.state.tags}
	  					suggestions={this.state.suggestions}
	  					handleDelete={this.handleDelete}
	  					handleAddition={this.handleAddition} />


  				</div>
  			)
  	}


}

export default SearchColumn;