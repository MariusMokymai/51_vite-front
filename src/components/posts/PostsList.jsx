import { useEffect, useState } from 'react';
import SinglePost from './SinglePost';
import axios from 'axios';

const postUrl = 'http://localhost:3000/api/posts/';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const tokenStorage = localStorage.getItem('bit_token');
  const [token, setToken] = useState(tokenStorage);
  console.log('token ===', token);
  // parisisiusti postus ir paduoti i postsLIst

  useEffect(() => {
    // if token tada
    getPosts(postUrl);
    function getPosts(url) {
      console.log('getPosts');
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('response ===', response);
          const posts = response.data;
          setPosts(posts);
        })
        .catch((error) => {
          console.log('error ===', error);
        });
    }
  }, []);

  return (
    <div className='container'>
      <h2 className='display-3'>Our posts</h2>

      <ul className='unlisted grid-2'>
        {posts.map((post) => (
          <SinglePost key={post.post_id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
