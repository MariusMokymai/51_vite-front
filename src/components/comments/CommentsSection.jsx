import axios from 'axios';
import { useEffect, useState } from 'react';
import useApiData from '../../hooks/useApiData';

const baseCommUrl = 'http://localhost:3000/api/comments/post';

function CommentsSection({ postId }) {
  console.log('postId ===', postId);

  const [commArr, setCommArr, err] = useApiData(`${baseCommUrl}/${postId}`);
  console.log('commArr ===', commArr);

  return (
    <section>
      <h3>Comments</h3>
      <form action=''>
        <h2>Create comment form</h2>
      </form>
      <ul>
        {commArr.map((cObj) => (
          <li className='border p-4' key={cObj.comm_id}>
            <h3 className='fs-5'>Author: {cObj.author}</h3>
            <p>{cObj.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentsSection;
