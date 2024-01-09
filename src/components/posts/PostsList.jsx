import React from 'react';
import SinglePost from './SinglePost';

function PostsList() {
  return (
    <div>
      <h2 className='display-3'>Our posts</h2>
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </div>
  );
}

export default PostsList;
