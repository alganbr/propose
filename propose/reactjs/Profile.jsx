import React from 'react';
import { render } from 'react-dom';

import ProfileContainer from './containers/ProfileContainer';

class Profile extends React.Component {
  render() {
    return (
      <ProfileContainer />
    )
  }
}

render(<Profile/>, document.getElementById('profile'))
