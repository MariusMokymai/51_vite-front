// import Users from './components/Users';
import { useState } from 'react';
import Login from './components/auth/Login';
import Header from './components/layout/Header';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function handleLogin(email) {
    console.log('user Logged in', email);
    setIsUserLoggedIn(true);
    setUserEmail(email);
  }

  function logout() {
    setIsUserLoggedIn(false);
    setUserEmail('');
  }

  return (
    <div className='container'>
      <Header
        logout={logout}
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
      />
      {isUserLoggedIn === false && <Login onLogin={handleLogin} />}
      {isUserLoggedIn === true && (
        <div className='alert alert-success'>You have logged in</div>
      )}
    </div>
  );
}

export default App;
