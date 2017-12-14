import React from 'react'
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";

class FreelancerCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    rating: PropTypes.number,
    reveiwCount: PropTypes.number,
    description: PropTypes.string,
    skills: PropTypes.array,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card>
        <CardBody>
          <div>
            {this.props.name}
          </div>
          <div>
            {this.props.reveiwCount}
          </div>
          <div>
            <StarRatingComponent
              name="rate1"
              value={this.props.rating}
              emptyStarColor="#ffb400"
            />
          </div>
          <div>
            {this.props.description}
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default FreelancerCard
