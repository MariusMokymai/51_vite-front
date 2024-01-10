import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';

const loginUrl = 'http://localhost:3000/api/auth/login';

function Login() {
  const navigate = useNavigate();
  // pasiimti is kontext
  const { login } = useAuthContext();

  const [authState, setAuthState] = useState({
    email: 'james@bond.com',
    password: '123456',
  });

  // function handleEmailInput(event) {
  //   console.log('event.target.name ===', event.target.name);
  //   setAuthState({ ...authState, email: event.target.value });
  // }
  // function handlePassInput(event) {
  //   console.log('event.target.name ===', event.target.name);
  //   setAuthState({ ...authState, password: event.target.value });
  // }

  /**
   * function to enter input values to state
   * @param {*} event
   */
  function handleInput(event) {
    const { name, value } = event.target;
    console.log('name ===', name);
    setAuthState({ ...authState, [name]: value });
  }

  /** jsdoc
   *
   * @param {SubmitEvent} event
   */
  function handleLogin(event) {
    event.preventDefault();
    console.log('js in control');

    // validation

    axios
      .post(loginUrl, authState)
      .then((ats) => {
        console.log('ats ===', ats);
        const { token } = ats.data;
        if (token) {
          // handle success
          console.log('token ===', token);
          login(token, authState.email);
          navigate('/posts');
          // issaugoti token i localstorage
          // localStorage.setItem('bit_token', token);
          // onLogin(authState.email);
        }
      })
      .catch((error) => {
        console.warn('handleLogin ivyko klaida:', error);
        const errorAxios = error.response.data;
        console.log('errorAxios ===', errorAxios);
        // handle error
      });
  }

  return (
    <div className='container'>
      <h2>Login</h2>
      <h3>
        {authState.email} - {authState.password}
      </h3>
      <form onSubmit={handleLogin} noValidate>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            onChange={handleInput}
            value={authState.email}
            type='email'
            name='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            onChange={handleInput}
            value={authState.password}
            name='password'
            type='password'
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
