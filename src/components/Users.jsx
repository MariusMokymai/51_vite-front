import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api';

function Users() {
  const [usersArr, setUsersArr] = useState([]);
  // parsisiusti usersius ir iskonsolinti
  useEffect(() => {
    axios
      .get(`${baseUrl}/users`)
      .then((ats) => {
        console.log('ats ===', ats);
        setUsersArr(ats.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }, []);
  // sugeneruoti html

  console.log('usersArr ===', usersArr);

  return (
    <div>
      <h2>Users</h2>
      <ul className='unlisted'>
        {usersArr.map((uObj) => (
          <li key={uObj.id}>
            (id: {uObj.id}) {uObj.name} yra is {uObj.town}. vairuoja:{' '}
            {uObj.isDriver ? 'Taip' : 'Ne'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
