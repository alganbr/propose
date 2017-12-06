import React from 'react'
import PropTypes from 'prop-types';

class WorkInfo extends React.Component {
  static propTypes = {
    phone: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Hello!</div>
    )
  }
}

export default WorkInfo;
