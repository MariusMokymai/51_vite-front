import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../store/authContext';

const postsUrl = 'http://localhost:3000/api/posts';

const postObj = {
  title: 'Post 1',
  author: 'James Band',
  content: 'Body of post 1',
  date: '2023-12-26T22:00:00.000Z',
  cat_id: 1,
};

const categotries = [
  {
    cat_id: 1,
    title: 'Comedy',
  },
  {
    cat_id: 2,
    title: 'Thriller ',
  },
  {
    cat_id: 3,
    title: 'Tragedy',
  },
  {
    cat_id: 4,
    title: 'Detective ',
  },
];

function AddPostPage() {
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      content: '',
      date: '',
      cat_id: 1,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).required('Privalomas laukas'),
      author: Yup.string().min(3).required(),
    }),
    onSubmit: (valuesObj) => {
      console.log('Submited');
      console.log('valuesObj ===', valuesObj);
      // fetch/axios to be
      sendCreateNewPost(valuesObj);
    },
  });

  const { token } = useAuthContext();

  function sendCreateNewPost(data) {
    axios
      .post(postsUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((ats) => {
        console.log('ats ===', ats);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error.response.data);
      });
  }

  // console.log('formik.values ===', formik.values);
  console.log('formik.errors ===', formik.errors);
  console.log('formik.touched ===', formik.touched);

  return (
    <div className='container'>
      <h2>Create Post</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type='text'
            className='form-control'
            id='title'
          />
          {formik.touched.title && formik.errors.title && (
            <p className='text-danger'>{formik.errors.title}</p>
          )}
        </div>

        <div className='mb-3'>
          <label htmlFor='author' className='form-label'>
            Author
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
            type='text'
            className='form-control'
            id='author'
          />
          {formik.touched.author && formik.errors.author && (
            <p className='text-danger'>{formik.errors.author}</p>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>
            Date
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            type='datetime-local'
            className='form-control'
            id='date'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Content
          </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className='form-control'
            id='content'
            rows='3'></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Category
          </label>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cat_id}
            className='form-select'
            aria-label='Default select example'
            id='cat_id'>
            <option defaultValue>Select category</option>
            {categotries.map((cat) => (
              <option key={cat.cat_id} value={cat.cat_id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Create
        </button>
      </form>
    </div>
  );
}

export default AddPostPage;
