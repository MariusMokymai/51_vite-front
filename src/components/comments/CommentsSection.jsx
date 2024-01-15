import axios from 'axios';
import { useEffect, useState } from 'react';
import useApiData from '../../hooks/useApiData';

const baseCommUrl = 'http://localhost:3000/api/comments/post';

function CommentsSection({ postId }) {
  console.log('postId ===', postId);

  const [commArr, setCommArr, err] = useApiData(`${baseCommUrl}/${postId}`);
  console.log('commArr ===', commArr);

  // const [commArr, setCommArr] = useState([]);

  // useEffect(() => {
  //   getPost(`${baseCommUrl}/${postId}`);

  //   function getPost(url) {
  //     console.log('getPosts');
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         console.log('response ===', response);
  //         const commFromAPI = response.data;
  //         setCommArr(commFromAPI);
  //       })
  //       .catch((error) => {
  //         console.log('error ===', error);
  //       });
  //   }
  // }, [postId]);

  return (
    <section>
      <h3>Comments</h3>
      <form action=''>
        <h2>Create comment form</h2>
      </form>
      <ul>
        <li>commm1</li>
        <li>commm1</li>
        <li>commm1</li>
        <li>commm1</li>
      </ul>
    </section>
  );
}

export default CommentsSection;
