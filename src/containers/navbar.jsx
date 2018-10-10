import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="navbar">
        <h1>CSDoors</h1>
        <button value='post' onClick={this.props.handleApp}>Post</button>
        <button value='home' onClick={this.props.handleApp}>Home</button>
        <button value='profile'>Profile</button>
      </div>
    )
  }
}

export default NavBar; 