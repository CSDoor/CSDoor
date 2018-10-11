import React, { Component } from 'react';

// components
import OptionsContainer from './containers/options-container.jsx';
import InterviewContainer from './containers/interview-container.jsx';
import NavBar from './containers/navbar.jsx';
import AddInterview from './components/add-interview.jsx'; 

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addInterview: false,
      app: 'view'
    }
    this.handleApp = this.handleApp.bind(this); 
  }

  handleApp(event){
    this.setState({app: event.target.value})
  };
  
  render() {
    // // by default show the interviews
    let app = (
      <div id="home-container">
        <OptionsContainer />
        <InterviewContainer />
      </div>
    )
    // if user clicks "post" button, render post interview page
    if (this.state.app === 'post') {
      app = (
        <div id="post-container">
          <AddInterview app={this.state.app}/>
        </div>
      )
    }

    return (
      <div className="App">
        <NavBar handleApp={this.handleApp}/>
        {app}
      </div>
    )
  }
}

export default App; 