import React from 'react';
import ReactDOM from 'react-dom';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';

import { Form, TextareaField, SubmitField } from 'react-components-form';

import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

class SearchColumn extends React.Component {
  propTypes = {
    onSubmit: PropTypes.func,
    component: PropTypes.element,
    tagType: PropTypes.string,
  }
  constructor (props) {
    super(props)

    this.state = {
      projectSize: "small",
      tags: [],
      suggestions: [],
    }
  }

  componentDidMount() {
    let component = this;
    let profileUrl = "/api/tags";
    let settings = {
        method: "GET",
        credentials: 'same-origin',
    };

    fetch(profileUrl, settings)
        .then((response) => response.json())
        .then((data) => {
          component.setState({suggestions: data});
        });
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

  onSubmit = (model) => {
    const tags = this.state.tags;
    const parsedTags = tags.map(tag => {
      return tag.name;
    })
    const tagString = parsedTags.toString();
    let url = "/api/projects/?" + $.param({search_terms: model.search, tags: tagString})
    console.log(url)
    let settings = {
        method: "GET",
        credentials: 'same-origin'
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "Looking at data")
          this.props.component.setState({projects:data});
        });
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
        <Form
          onSubmit={this.onSubmit}
          onError={(errors, model) => console.log('error', errors, model)}
        >
          <TextareaField className="textarea" name="search" label="Search" />
          <SubmitField value="Search" />
        </Form>
      </div>
    )
  }
}

export default SearchColumn;
