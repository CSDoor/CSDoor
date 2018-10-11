import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="navbar">
        <div id="nav-title">
          <h1>CSDoor</h1>
        </div>
        <div id='nav-buttons'>
          <button className='nav-button' value='post' onClick={this.props.handleApp}>Post</button>
          <button className='nav-button' value='home' onClick={this.props.handleApp}>Home</button>
          {/* <button value='profile'>Profile</button> */}
        </div>
      </div>
    )
  }
}

export default NavBar; 