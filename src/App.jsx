// import Users from './components/Users';
import { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import PostsList from './components/posts/PostsList';
import './App.css';
import axios from 'axios';
import About from './components/About';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const postUrl = 'http://localhost:3000/api/posts/';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState('email');

  const [posts, setPosts] = useState([]);

  // parisisiusti postus ir paduoti i postsLIst

  useEffect(() => {
    getPosts(postUrl);
    function getPosts(url) {
      console.log('getPosts');
      axios
        .get(url)
        .then((response) => {
          console.log('response ===', response);
          const posts = response.data;
          setPosts(posts);
        })
        .catch((error) => {
          console.log('error ===', error);
        });
    }
  }, []);

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
    <div className=''>
      <Header
        logout={logout}
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={
            <>
              {isUserLoggedIn === false && <Login onLogin={handleLogin} />}
              {isUserLoggedIn === true && (
                <div className='alert alert-success'>You have logged in</div>
              )}
            </>
          }
        />
        <Route path='/posts' element={<PostsList list={posts} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
