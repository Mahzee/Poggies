import React, { Component } from "react";
import TweetBox from "./TweetBox.js";
import Post from "./Post.js";
import "./Feed.css";
import axios from "axios";
import Widgets from "./Widgets";
import Sidebar from "./Sidebar";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { listOfPosts: [] };
  }

  render() {
    return (
      <>
        <Sidebar myId={this.props.myId} />
        <div className="feed">
          <div className="feed_header">
            <h2>Home</h2>
          </div>
          <TweetBox />
          {this.state.listOfPosts.map((post, index) => (
            <Post text={post.message} displayName={post.UserName} key={index} />
          ))}
          {console.log(this.state.listOfPosts)}
        </div>
        <Widgets />
      </>
    );
  }
}

export default Feed;
