import React, { Component } from 'react'
import OptionsContainer from './containers/OptionsContainer.jsx'
import PostContainer from './containers/PostContainer.jsx'
import NavBar from './containers/NavBar.jsx'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div id="app-container">
          <OptionsContainer />
          <PostContainer />
        </div>
      </div>
    )
  }
}