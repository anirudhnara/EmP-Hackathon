import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from "./templates/Home";
import Header from "./templates/Header";
import Account from "./templates/Account";
const App = () => {
  return (
    <div>
      <Header name = {window.location.pathname}/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<Account />} />
      </Routes> 
    </div> 
  )
}

export default App;