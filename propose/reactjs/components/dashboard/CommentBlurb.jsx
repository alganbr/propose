import React from 'react'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';


const placeHolderImage = "https://i.imgur.com/UyiR4w5.png";

export default class CommentBlurb extends React.Component {
  static propTypes = {
    comment: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const comment = this.props.comment;
    let clientName = "";
    if (comment && comment.user && comment.user.user) {
      clientName = comment.user.user.first_name + " " + comment.user.user.last_name;
    }
    return (
      <div className="review-blurb">
          <div className="row">
            <div className="col-sm-2 picture">
              <img src={placeHolderImage} className="review-picture"/>
            </div>
            <div className="col-sm-10 review">
              <div className="row">
                <div className="col-sm-10">
                  <span className="text-main">{clientName}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 review-description">
                  <span>{(comment.comment !== undefined) ? comment.comment : ""}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}