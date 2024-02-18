import React from 'react';
import {Routes, route} from 'react-router-dom';
import Home from "./templates/Home";
import Header from "./templates/Header"
const App = () => {
  return (
    <div>
      <Header name = "test"/> 
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes> 
    </div> 
  )
}

export default App;