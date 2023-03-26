import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="top-nav">
        <ul className='flex'>
          <li>
            <Link to="/" className='logo'>Conduit</Link>
          </li>
          <li>
          <ul className='right-nav flex'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          </ul>
          </li>
        </ul>
      </nav>
    );
  }
}
