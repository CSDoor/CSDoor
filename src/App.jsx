import React, { Component } from 'react'
// import OptionsContainer from './containers/OptionsContainer.jsx'
import PostContainer from './containers/PostContainer.jsx'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <PostContainer />
      </div>
    )
  }
}