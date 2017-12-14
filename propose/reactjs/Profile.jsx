import React from 'react';
import { render } from 'react-dom';

import ProfileContainer from './containers/ProfileContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/profile.scss';

class Profile extends React.Component {
  render() {
    return (
      <ProfileContainer />
    )
  }
}

render(<Profile/>, document.getElementById('Profile'))
