import React, {useContext } from 'react';
import Topbar from './components/Topbar/Topbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Single from './pages/Single/Single';
import Rules from './pages/Rules/Rules';
import Write from './pages/Write/Write';
import Footer from './components/Footer/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {GoogleContext } from './context/Context';


function App() {
  const user = useContext(GoogleContext);
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" element={
            user ? <Home /> : <Login />
          }></Route>
          <Route path="/write" element={
            user ? <Write /> : <Login />
          }></Route>
          <Route path="/rules" element={<Rules />}></Route>
          <Route path="/post/:postId" element={<Single />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
