import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import About from '../profile/About';
import ProfileInformation from '../profile/ProfileInformation';
import ReviewBlurb from '../profile/ReviewBlurb';
import WorkInfo from '../profile/WorkInfo';

import 'react-tabs/style/react-tabs.scss';

export default class Mainbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  render() {
    let image = "https://i.imgur.com/UyiR4w5.png";
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis nulla id scelerisque molestie. Pellentesque non tristique mauris. Vivamus a blandit turpis. Pellentesque tempus elit sit amet magna bibendum ullamcorper. Fusce nisl augue, laoreet a fringilla quis, viverra a leo. Phasellus aliquam tempor nisi.";

    return (
      <div className="mainbar">
        <ProfileInformation
          {...this.props.user.user}
          bio={this.props.user.bio}
          rating={this.props.user.rating}
        />
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab>About</Tab>
            <Tab>Comments</Tab>
            <Tab>Attachments</Tab>
            <Tab>Update</Tab>
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
            <ReviewBlurb
              clientName="Lorem ipsum dolor"
              rating={5}
              image={image}
              reviewText={lorem}
            />
            <ReviewBlurb
              clientName="Lorem ipsum dolor"
              rating={4}
              image={image}
              reviewText={lorem}
            />
            <ReviewBlurb
              clientName="Lorem ipsum dolor"
              rating={3}
              image={image}
              reviewText={lorem}
            />
            <ReviewBlurb
              clientName="Lorem ipsum dolor"
              rating={5}
              image={image}
              reviewText={lorem}
            />
          </TabPanel>
          <TabPanel>
            <h3> TO BE ADDED</h3>
          </TabPanel>
        </Tabs>


      </div>
    );
  }
}
