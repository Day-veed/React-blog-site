import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import SignInOutContainer from './pages/SignInOutContainer';
import { logout, selectUser } from "./features/userSlice"
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout())
    auth.signOut()
  }
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!user ? <Link to="/signinout">Login</Link> : <><Link to="/createpost">Create Post</Link><button onClick={logOut}> Log Out</button></>}
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signinout' element={<SignInOutContainer setIsAuth={setIsAuth}/>} />
        <Route path='/createpost' element={<CreatePost setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
