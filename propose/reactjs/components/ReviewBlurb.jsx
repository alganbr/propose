import React from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component'; 

class ReviewBlurb extends React.Component {
	static propTypes = {
		clientName: PropTypes.string,
		rating: PropTypes.number,
		image: PropTypes.string,
		reviewText: PropTypes.string,
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="container">
				SUP!
			</div>
		)
	}
}

export default ReviewBlurb;