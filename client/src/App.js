import React, { useState, useEffect, useRef, useContext } from 'react';
import Topbar from './components/Topbar/Topbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Settings from './pages/Settings/Settings';
import Single from './pages/Single/Single';
import Write from './pages/Write/Write';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Context } from './context/Context';


function App() {
  const {user} = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/register" element={
            user ? <Home /> : <Register />
          }></Route>
          <Route path="/login" element={
            user ? <Home /> : <Login />
          }></Route>
          <Route path="/write" element={
            user ? <Write /> : <Register />
          }></Route>
          <Route path="/settings" element={
            user ? <Settings /> : <Register />
          }></Route>
          <Route path="/post/:postId" element={<Single />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
