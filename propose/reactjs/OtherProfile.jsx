import React from 'react';
import { render } from 'react-dom';

import OtherProfileContainer from './containers/OtherProfileContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/profile.scss';

class OtherProfile extends React.Component {


  render() {
    const splitHref = window.location.href.split("/")
    const cleanHref = new Array();
    for (let i = 0; i< splitHref.length; i++) {
      if (splitHref[i]) {
        cleanHref.push(splitHref[i])
      }
    }
    const userId = cleanHref[cleanHref.length - 1];
    return (
      <OtherProfileContainer userId={userId}/>
    )
  }
}

render(<OtherProfile/>, document.getElementById('OtherProfile'))
