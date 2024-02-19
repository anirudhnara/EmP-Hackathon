import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./pages/Header";
import Account from "./pages/Account";
import TestDashboard from './pages/test_pages/Test_Dashboard';
import TestLogin from './pages/test_pages/Test_Login';
import TestRegister from './pages/test_pages/Test_Register';
import TestHome from './pages/test_pages/Test_Home';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <div>
      <Header name = {window.location.pathname}/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/dashboard" element={<TestDashboard />} />
        <Route path="/login" element={<TestLogin />} />
        <Route path="/register" element={<TestRegister />} />
        <Route path="/createpost" element={<CreatePost />} />
        {/* <Route path="/home" element={<TestHome />} /> */}
      </Routes> 
    </div> 
  )
}

export default App;