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

function SmartInput({ id, formik, type = 'text' }) {
  // id = title

  const areaInput = (
    <textarea
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      className='form-control'
      id={id}
      rows='3'></textarea>
  );

  return (
    <>
      <label className='form-label w-100'>
        <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>

        {type === 'textarea' ? (
          areaInput
        ) : (
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
            type={type}
            className='form-control'
            id={id}
          />
        )}
      </label>
      {formik.touched[id] && formik.errors[id] && (
        <p className='text-danger'>{formik.errors[id]}</p>
      )}
    </>
  );
}

function AddPostPage() {
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      content: '',
      date: '',
      cat_id: 3,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).required('Privalomas laukas'),
      author: Yup.string().min(3).required(),
      date: Yup.date().required(),
      content: Yup.string().min(5, 'Prasom placiau').required(),
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
          <SmartInput id='title' formik={formik} />
        </div>

        <div className='mb-3'>
          <SmartInput id='author' formik={formik} />
        </div>
        <div className='mb-3'>
          <SmartInput id='date' type='date' formik={formik} />
        </div>
        <div className='mb-3'>
          <SmartInput id='content' type='textarea' formik={formik} />
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
            <option disabled defaultValue>
              Select category
            </option>
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
