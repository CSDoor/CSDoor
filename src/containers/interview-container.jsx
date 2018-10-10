import React, { Component } from 'react'
import Post from '../components/post.jsx'

const posts = [];
export default class Feed extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/getInterview', {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
      }
    })
    .then(response => {
      console.log('response', response);
      response.json();
    })
    .then((data, i) => {
      console.log('data fetched:', data);
      //posts.push(<Post interview={data[i]} key={i}/>)
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