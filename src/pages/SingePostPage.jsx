import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../store/authContext';
import CommentsSection from '../components/comments/CommentsSection';

const basePostsUrl = 'http://localhost:3000/api/posts';

const postObj = {
  post_id: 1,
  title: 'Post 1',
  author: 'James Band',
  content: 'Body of post 1',
  date: '2023-12-26T22:00:00.000Z',
  commentCount: 1,
  categoryName: 'Comedy',
};

function SinglePostPage() {
  // gauti kelio paramaetra :postId

  const { postId } = useParams();
  console.log('postId ===', postId);

  const [postObj, setPostObj] = useState({});
  const { token } = useAuthContext();

  console.log('postObj ===', postObj);

  useEffect(() => {
    getPost(`${basePostsUrl}/${postId}`);

    function getPost(url) {
      console.log('getPosts');
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('response ===', response);
          const post = response.data;
          setPostObj(post);
        })
        .catch((error) => {
          console.log('error ===', error);
        });
    }
  }, [postId, token]);

  // parisisiusti is be single post informacija

  return (
    <div className='container'>
      <h2 className='display-3'>Post about: {postObj.title}</h2>
      <p className='lead'>{postObj.author}</p>
      <p>
        Posted on:<i>{new Date(postObj.date).toLocaleString('lt')}</i>
      </p>
      <p>{postObj.content}</p>
      <p className='lead fs-3'>{postObj.categoryName}</p>

      <CommentsSection postId={postId} />
    </div>
  );
}

export default SinglePostPage;
