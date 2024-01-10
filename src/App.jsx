// import Users from './components/Users';
import { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import PostsList from './components/posts/PostsList';
import './App.css';

import About from './components/About';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useAuthContext } from './store/authContext';
import UsersOnlyPage from './pages/UsersOnlyPage';
import AddPostPage from './pages/AddPostPage';

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
        {/* Protected Route */}
        <Route
          path='/posts'
          element={
            isUserLoggedIn ? <PostsList /> : <Navigate to={'/user-only'} />
          }
        />
        <Route
          path='/add-post'
          element={
            isUserLoggedIn ? <AddPostPage /> : <Navigate to={'/user-only'} />
          }
        />
        <Route path='/home' element={<Navigate to={'/'} />} />
        <Route path='/about' element={<About />} />
        <Route path='/user-only' element={<UsersOnlyPage />} />
      </Routes>
    </div>
  );
}

export default App;
