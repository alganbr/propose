import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import { Form, TextareaField, SubmitField, SelectField } from 'react-components-form';
import Cookies from 'js-cookie';

import About from './About';
import ProfileInformation from './ProfileInformation';
import ReviewBlurb from './ReviewBlurb';
import WorkInfo from './WorkInfo';

import 'react-tabs/style/react-tabs.scss';

export default class Mainbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      modalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  onSubmit = (model) => {
    var headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));

    const reviewURL = `/api/users/${this.props.user.id}/review/`;
    const review = {
      review: model.review,
      rating: model.rating
    }
    const settings = {
        method: "POST",
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(review)
    };

    fetch(reviewURL,  settings)
        .then((response) => response.json())
        .then((data) => {});

    alert('Reviewed!');
    this.setState({modalIsOpen: false});
  }

  render() {
    let image = "https://i.imgur.com/UyiR4w5.png";
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";
    let modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      },
      content: {
        margin: '0 auto',
        marginTop: '50px',
        backgroundColor: '#FFFFFF',
        height: '500px',
        width: '700px',
      }
    };

    let review = [];
    if (!this.props.profile) {
      const options = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ];

      review.push(
        <button className="btn btn-primary" onClick={this.openModal}>
          Leave a Review
        </button>
      );

      review.push(
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={() => {}}
          onRequestClose={this.closeModal}
          contentLabel="Application Form"
          ariaHideApp={false}
          style={modalStyle}
        >
          <h3>Leave a Review!</h3>
          <div className="form">
            <Form
              onSubmit={this.onSubmit}
              onError={(errors, model) => console.log('error', errors, model)}
            >
              <SelectField
                name="rating"
                options={options}
                label="Rating"
              />
              <TextareaField
                name="review"
                label="Review"
              />
              <SubmitField value="Review" />
            </Form>
          </div>
        </Modal>
      );
    }

    let reviews = [];
    let rating = 0;
    let count = 0;
    if (this.props.user.reviews) {
      this.props.user.reviews.map((review) => {
        reviews.push(
          <ReviewBlurb
            clientName={`${review.reviewer.user.first_name} ${review.reviewer.user.last_name}`}
            rating={review.rating}
            image={review.reviewer.profile_pic}
            reviewText={review.review}
          />
        );
        rating += review.rating;
      });
      count = this.props.user.reviews.length;
    }

    if (reviews.length === 0) {
      reviews.push(<span className="empty-reviews">No reviews yet.</span>);
    }

    return (
      <div className="mainbar">
        <ProfileInformation
          {...this.props.user.user}
          bio={this.props.user.bio}
          rating={rating}
        />
        {review}
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab><FontAwesome name="user" className="tab-icon" />About</Tab>
            <Tab><FontAwesome name="briefcase" className="tab-icon" />Work Info </Tab>
            <Tab><FontAwesome name="file-text-o" className="tab-icon" />Reviews</Tab>
          </TabList>
          <TabPanel>
            <About
              phone="9256819639"
              email="fkennedy@ucla.edu"
              facebook="https://www.facebook.com/fwedeorange"
              twitter="https://twitter.com/fwedeorange_"
              website="https://fkennedy.co"
            />
          </TabPanel>
          <TabPanel>
            <WorkInfo
              previousWork={[]}
              resume={this.props.user.resume}
              github="https://github.com/fkennedy"
              linkedin="https://www.linkedin.com/in/fkennedy0110"
            />
          </TabPanel>
          <TabPanel>
            {reviews}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}
