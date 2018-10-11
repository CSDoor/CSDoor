import React, { Component } from 'react'
import Post from '../components/post.jsx'

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : []
    }
  }
  componentDidMount() {
    fetch('/getInterview')
    .then(response => response.json())
    .then((data) => {
      console.log('data fetched:', data);
      this.setState({posts: data})
      //posts.push(<Post interview={data[i].question} key={i}/>)
    })
    .catch(err => {
      console.log(err)
    })

  }
  render() {
    console.log('this state posts', this.state.posts);
    const posts = [];
    if (this.state.posts.length > 0) {
      this.state.posts.forEach((post, i) => {
        posts.push(<Post interview={post} key={i}/>)
      })
    }
    console.log('posts', posts);
    return (
      <div id="interview-container">
        {posts}
      </div>
    )
  }
}