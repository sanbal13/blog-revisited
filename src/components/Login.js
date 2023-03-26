import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  };
  handleSubmit = () => {};
  handleEmail = (e) => {
    this.setState({ email: e.target.value }, () => {
      if (this.state.email === '' || !this.state.email.includes('@')) {
        this.setState({ emailError: 'Email is invalid!' });
      } else {
        this.setState({emailError: ''});
      }
    });
  };
  handlePassword = (e) => {
   // let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])$/;
    let upper = /[A-Z]/;
    let lower = /[a-z]/;
    let digits = /[0-9]/;
    this.setState({password: e.target.value}, () => {    
      if(this.state.password.length < 6 ) {
          this.setState({passwordError: 'Password must be atleast 6 characters long!'});
      } else if(!this.state.password.match(upper)) {
          this.setState({passwordError: 'Password must contain atleast one uppercase character'});
      } else if(!lower.test(this.state.password)) {
        this.setState({passwordError: 'Password must contain atleast one lowercase character'});
      } else if(!digits.test(this.state.password)) {
        this.setState({
          passwordError: 'Password must contain atleast one digit'
        });
      } else {
        this.setState({passwordError: ''});
      }
    })
  };

  render() {
    return (
      <>
        <Navigation />
        <div>Login</div>
        <form className="form">
          <label htmlFor="Email">Email: </label>
          <input
            type="text"
            name=""
            id="Email"
            placeholder="Email"
            onChange={(e) => this.handleEmail(e)}
          />
          <span className='error'>{this.state.emailError}</span>
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name=""
            id=""
            placeholder="password"
            onChange={(e) => {
              this.handlePassword(e);
            }}
          />
          <span className='error'>{this.state.passwordError}</span>
          <br />
          <button onClick={this.handleSubmit}> Login </button>
          <div className="signup-link">
            <Link to="/signup">Don't have an account? SignUp</Link>
          </div>
        </form>
      </>
    );
  }
}
