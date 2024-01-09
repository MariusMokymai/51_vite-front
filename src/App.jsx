// import Users from './components/Users';
import { useState } from 'react';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import PostsList from './components/posts/PostsList';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState('email');

  // parisisiusti postus ir paduoti i postsLIst

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
      <PostsList />
    </div>
  );
}

export default App;
