import React, { Component } from 'react'

export default class Post extends Component {
  render() {
    return (
      <div className="post">
        Interview question: Create a func that accepts a linked list and returns true if the linked list has a cyclical reference
        {this.props.interview}
      </div>
    )
  }
}