import { useFormik } from 'formik';

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
      author: ' Band',
      content: 'Body of post 1',
      date: '',
      cat_id: 1,
    },
    onSubmit: (valuesObj) => {
      console.log('Submited');
      console.log('valuesObj ===', valuesObj);
      // fetch/axios to be
    },
  });

  console.log('formik.values ===', formik.values);

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
            value={formik.values.title}
            type='text'
            className='form-control'
            id='title'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='author' className='form-label'>
            Author
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.author}
            type='text'
            className='form-control'
            id='author'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>
            Date
          </label>
          <input
            onChange={formik.handleChange}
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
