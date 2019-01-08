import React, { Component } from 'react';
import Post from '../components/post.jsx';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch('/getInterview')
      .then(response => response.json())
      .then((data) => {
        const posts = [];
        data.forEach((post, i) => {
          posts.push(<Post interview={post} key={i} />);
        });
        this.setState({ posts });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    return (
      <div id="interview-container">
        {posts}
      </div>
    );
  }
}
