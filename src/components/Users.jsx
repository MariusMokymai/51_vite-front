import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api';

function Users() {
  const [usersArr, setUsersArr] = useState([]);
  const [nameVal, setNameVal] = useState('');
  const [townVal, setTownVal] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  // parsisiusti usersius ir iskonsolinti
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get(`${baseUrl}/users`)
      .then((ats) => {
        console.log('ats ===', ats);
        setUsersArr(ats.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  // sugeneruoti html

  console.log('usersArr ===', usersArr);

  function handleNewUserSubmit(event) {
    event.preventDefault();
    console.log('js is in control');
    // sudeti viska i viena obj
    const newUser = {
      name: nameVal,
      town: townVal,
      isDriver,
    };
    console.log('newUser ===', newUser);
    // siusiuti ta ob i back
    axios
      .post(`${baseUrl}/users`, newUser)
      .then((ats) => {
        console.log('ats ===', ats);
        if (ats.status === 201) {
          // success useris sukurtas
          // atnaujinti sarasa
          getUsers();
          return;
        }
        // neskeme, nepavyko
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
        // show errors
        alert('klaida');
      });
    // pavyko ar ne
  }

  console.log('nameVal ===', nameVal);

  function handleDelete(idToDelete) {
    console.log('deleting post', idToDelete);
  }

  return (
    <div>
      <h2>Users</h2>

      <h3>Add new user</h3>
      <form onSubmit={handleNewUserSubmit} className='border p-4 '>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            type='text'
            className='form-control'
            id='name'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='town' className='form-label'>
            Town
          </label>
          <input
            value={townVal}
            onChange={(e) => setTownVal(e.target.value)}
            type='text'
            className='form-control'
            id='town'
          />
        </div>
        <div className='mb-3 form-check'>
          <input
            value={isDriver}
            onChange={(e) => setIsDriver(e.target.checked)}
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Driver
          </label>
        </div>

        <button type='submit' className='btn btn-outline-info'>
          Create
        </button>
      </form>

      <ul className='list-group'>
        {usersArr.map((uObj) => (
          <li className='list-group-item' key={uObj.id}>
            (id: {uObj.id}) {uObj.name} yra is {uObj.town}. vairuoja:{' '}
            {uObj.isDriver ? 'Taip' : 'Ne'}
            <button
              onClick={() => handleDelete(uObj.id)}
              // onClick={handleDelete.bind(null, uObj.id, event)}
              className='btn btn-danger mx-3'>
              delete
            </button>
            <button className='btn btn-success'>edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
