import React from 'react';
import { render } from 'react-dom';

import SettingsContainer from './containers/SettingsContainer';

import './styles/global.scss';
import './styles/navbar.scss';
import './styles/settings.scss';

class Settings extends React.Component {
  render() {
    return (
      <SettingsContainer />
    )
  }
}

render(<Settings/>, document.getElementById('Settings'))
