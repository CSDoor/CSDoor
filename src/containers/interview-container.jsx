import React, { Component } from 'react'
import Post from '../components/post.jsx'

const posts = [];
export default class Feed extends Component {

  componentDidMount() {
    fetch('/getInterview')
    .then(response => response.json())
    .then((data) => {
      console.log('data fetched:', data);
      //posts.push(<Post interview={data[i]} key={i}/>)
    })
    .catch(err => {
      console.log(err)
    })

  }
  render() {
    return (
      <div id="interview-container">
        {posts}
      </div>
    )
  }
}