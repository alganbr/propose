import React from 'react';

import Headline from '../components/Headline';
import Header from '../components/splash/Header';
import Navbar from '../components/Navbar';

export default class LoginContainer extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Navbar login={false}/>
            <Headline>Login</Headline>
            Don't have an account? <a href="/register">Click here to register</a>.
            <div class="container" style={{ 'width': '40%'}}>
              <form action="" method="POST">
                <div class="row">
                  <div class="col-sm-4">Username</div>
                  <div class="col-sm-8"><input type="text" name="email" /></div>
                  <div class="col-sm-4">Password</div>
                  <div class="col-sm-8"><input type="password" name="password" /></div>
                  <div class="col-sm-6"><button class="btn btn-secondary" type="reset">Reset</button></div>
                  <div class="col-sm-6"><button class="btn btn-primary" type="submit">Login</button></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
