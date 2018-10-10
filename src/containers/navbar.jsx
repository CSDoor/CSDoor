import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="navbar">
        <h1>CSDoor</h1>
        <FlatButton 
          label="Post Interview" 
          primary={true} 
          onClick={this.props.handleAddInterview}
        />
      </div>
    )
  }
}

export default NavBar; 