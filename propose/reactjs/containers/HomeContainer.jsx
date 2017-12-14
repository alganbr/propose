import React from 'react';

import Header from '../components/splash/Header';
import Navbar from '../components/Navbar';

export default class HomeContainer extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */

  render() {
    return (
      <div className="home">
        <Navbar login={true} />
        <Header />
      </div>
    )
  }
}
