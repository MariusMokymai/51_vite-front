// import Users from './components/Users';
import { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import PostsList from './components/posts/PostsList';
import './App.css';

import About from './components/About';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useAuthContext } from './store/authContext';

function App() {
  const { isUserLoggedIn } = useAuthContext();

  return (
    <div className=''>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={
            <>
              {isUserLoggedIn === false && <Login />}
              {isUserLoggedIn === true && (
                <div className='alert alert-success'>You have logged in</div>
              )}
            </>
          }
        />
        <Route path='/posts' element={<PostsList />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
