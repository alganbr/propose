import React from 'react'
import PropTypes from 'prop-types'; 

class WorkInfo extends React.Component {
	static propTypes = {
		previousWork: PropTypes.array,
		resume: PropTypes.string,
		github: PropTypes.string,
		linkedin: PropTypes.string, 
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
