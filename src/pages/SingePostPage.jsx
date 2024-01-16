import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../store/authContext';
import CommentsSection from '../components/comments/CommentsSection';

const basePostsUrl = 'http://localhost:3000/api/posts';

const postObj = {
  post_id: 1,
  title: 'Post 1',
  author: 'James Band',
  userEmail: '',
  content: 'Body of post 1',
  date: '2023-12-26T22:00:00.000Z',
  commentCount: 1,
  categoryName: 'Comedy',
};

function SinglePostPage() {
  // gauti kelio paramaetra :postId

  const navigate = useNavigate();

  const { postId } = useParams();
  console.log('postId ===', postId);
  const currentPostUrl = `${basePostsUrl}/${postId}`;

  const [postObj, setPostObj] = useState({});
  const { token, userEmail } = useAuthContext();

  console.log('postObj ===', postObj);

  useEffect(() => {
    getPost(currentPostUrl);

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

  function handleDeletePost() {
    axios
      .delete(currentPostUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((ats) => {
        console.log('ats ===', ats);
        console.log('ats.data ===', ats.data);
        // sekme
        navigate('/posts');
      })
      .catch((error) => {
        console.warn('handleDeletePost ivyko klaida:', error);
        console.warn('handleDeletePost ivyko klaida:', error.response);
      });
  }

  return (
    <div className='container'>
      <div className='border border-2 rounded p-3'>
        <h2 className='display-3'>Post about: {postObj.title}</h2>
        <p className='lead'>{postObj.author}</p>
        <p>
          Posted on:<i>{new Date(postObj.date).toLocaleString('lt')}</i>
        </p>
        <p>{postObj.content}</p>
        <p className='lead fs-3'>Category: {postObj.categoryName}</p>
        <div className='flex gap-2'>
          <button onClick={() => navigate('/posts')} className='btn btn-primary me-2'>
            Go back
          </button>
          {/* {userEmail === postObj.userEmail && ( */}
          {true && (
            <button onClick={handleDeletePost} className='btn btn-danger me-2'>
              Delete
            </button>
          )}
          {userEmail === postObj.userEmail && (
            <button className='btn btn-warning me-2'>Update</button>
          )}
        </div>
      </div>
      <hr />

      <CommentsSection postId={postId} />
    </div>
  );
}

export default SinglePostPage;
