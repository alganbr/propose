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

  handleLocationDelete = (i) => {
    const tags = this.state.locationTags.slice(0)
    tags.splice(i, 1)
    this.setState({ locationTags: tags })
  }

  handleLocationAddition = (tag) => {
    const tags = [].concat(this.state.locationTags, tag)
    this.setState({ locationTags: tags })
  }

  render() {
    return (
      <div className="search-column">
        <h3>Refine Your Search</h3>
        <h4>Skills</h4>
        <div>
          Add search tags
        </div>
        <ReactTags
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition} />
        <h4>Location</h4>
        <ReactTags
          tags={this.state.locationTags}
          suggestions={this.state.locationSuggestions}
          handleDelete={this.handleLocationDelete}
          handleAddition={this.handleLocationAddition} />
      </div>
    )
  }
}

export default SearchColumn;
