import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";
import Profile from './pages/Profile';
import EventPage from './pages/EventPage';
import AdminLogin from './pages/AdminLogin';
import AdminHomePage from './pages/AdminHomePage';
import AdminPost from './pages/AdminPost';
import AdminUserManage from './pages/AdminUserManage';
import AdminMentorManage from './pages/AdminMentorManage';
import Helps from './pages/Helps';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/admin' element={<AdminLogin/>}></Route>
          <Route path='/adminpanel' element={<AdminHomePage/>}></Route>
          <Route path='/events' element={<EventPage/>}></Route>
          <Route path='/postmanage' element={<AdminPost/>}></Route>
          <Route path='/usermanage' element={<AdminUserManage/>}></Route>
          <Route path='/mentormanage' element={<AdminMentorManage/>}></Route>
          <Route path='/helps' element={<Helps/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
