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
  return (
    <div>
      <h2>Create Post</h2>

      <form>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Author
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Content
          </label>
          <textarea
            className='form-control'
            id='exampleFormControlTextarea1'
            rows='3'></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Category
          </label>
          <select className='form-select' aria-label='Default select example'>
            <option selected>Select category</option>
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
