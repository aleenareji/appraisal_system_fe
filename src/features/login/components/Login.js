import React, { useState, Component } from 'react';
import GoogleLogin from "react-google-login";
import history from '../../../common/history';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      isUserLoggedIn: false
    };
  }

  responseGoogle = response => {
    // localStorage.clear();
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    const data ='token'
    const details =this.state.userDetails;
    console.log(details);
    localStorage.setItem('myToken', data);
    history.push('/dashboard');
    if(details.googleId === '100922163535934621082')
        localStorage.setItem('userRole','hr')
     };
 
  logout = () => {
    // localStorage.clear();
    this.setState({ isUserLoggedIn: false })
    localStorage.removeItem('myToken');
  
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.isUserLoggedIn && (
          <div className="google-login-btn">
            <div className="col-6 login-page" >
            </div>
            <div className="col-6 login">
              <div className="login-container">
                <div className="login-header">
                <h1>Appraisal System</h1>
                </div>
                <div className="login-body">
                </div>
                <div className="login-footer">
                  <GoogleLogin
                    // clientId="129401063798-c35cmt3qvb046uf4005cq423rl35mmb4.apps.googleusercontent.com"
                    clientId="233962906901-b6r1oi85g07f50lddoq1grfqjtpv55lr.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Login;