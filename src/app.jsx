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
      addInterview: false
    }
    this.handleAddInterview = this.handleAddInterview.bind(this); 
    this.handleCloseAddInterview = this.handleCloseAddInterview.bind(this); 
  }

  handleAddInterview(){
    this.setState({addInterview: true})
  }

  handleCloseAddInterview(){
    console.log('close'); 
    this.setState({addInterview: false})
  }

  render() {
    // // by default show the interviews
    // let app = (
    //   <div id="app-container">
    //     <OptionsContainer />
    //     <InterviewContainer />
    //   </div>
    // )
    // // if user clicks "post" button, render post interview page
    // if (this.state.app === 'post') {
    //   app = (
    //     <div id="app-container">
    //       <PostContainer />
    //     </div>
    //   )
    // }

    return (
      <div className="App">
        <NavBar handleAddInterview={this.handleAddInterview}/>
        <div id="app-container">
          <OptionsContainer />
          <InterviewContainer />
        </div>
        <AddInterview 
          addInterview={this.state.addInterview}
          handleCloseAddInterview={this.handleCloseAddInterview}
        />
      </div>
    )
  }
}

export default App; 