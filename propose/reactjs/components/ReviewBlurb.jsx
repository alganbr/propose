import React from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// import StarRatingComponent from 'react-star-rating-component'; 

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
				<div className="row">
					<div className="col-sm-4">
						{this.props.clientName}
					</div>
					<div className="col-sm-8">
						{this.props.rating}
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						{this.props.reviewText}
					</div>
				</div>
			</div>
		)
	}
}

export default ReviewBlurb;