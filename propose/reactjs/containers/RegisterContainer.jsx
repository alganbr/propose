import React from 'react';

import Headline from '../components/Headline';
import Header from '../components/splash/Header';
import Navbar from '../components/Navbar';

export default class RegisterContainer extends React.Component {

  /*
  TO LOAD FIXTURE DATA run the following for accounts

  python ../../manage.py loaddata initial_data.json
  This is in propose/account/fixtures


  */

  render() {
    return (
      <div className="register">
        <Navbar login={false}/>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Headline>Register</Headline>
              Have an account already? <a href="/login">Click here to login</a>.
              <div class="container" style={{ 'width': '40%'}}>
                <form action="" method="POST">
                  <div class="row">
                    <div class="col-sm-4">Email</div>
                    <div class="col-sm-8"><input type="email" name="email" required /></div>
                    <div class="col-sm-4">Password</div>
                    <div class="col-sm-8"><input type="password" name="password" required /></div>
                    <div class="col-sm-4">Re-type Password</div>
                    <div class="col-sm-8"><input type="password" name="password" required /></div>
                    <div class="col-sm-4">First Name</div>
                    <div class="col-sm-8"><input type="text" name="firstname" /></div>
                    <div class="col-sm-4">Last Name</div>
                    <div class="col-sm-8"><input type="text" name="lastname" /></div>
                    <div class="col-sm-6"><button class="btn btn-secondary" type="reset">Reset</button></div>
                    <div class="col-sm-6"><button class="btn btn-primary" type="submit">Register</button></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
