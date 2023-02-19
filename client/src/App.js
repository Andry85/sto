import Topbar from './components/Topbar/Topbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import Single from './pages/Single/Single';
import Rules from './pages/Rules/Rules';
import Write from './pages/Write/Write';
import Footer from './components/Footer/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Forgot from './pages/Forgot/Forgot';



function App() {
  const user = localStorage.getItem("userEmail");
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={
            user ? <Home /> : <Login />
          }></Route>
          <Route path="/register" element={
            user ? '' : <Register />
          }></Route>
          <Route path="/forgot" element={
            user ? '' : <Forgot />
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
