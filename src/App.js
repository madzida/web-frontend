import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from './components/Login';
import Form from './components//Form';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Form/>}></Route>
          <Route exact path='/signup' element={<SignupForm/>}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
       </Routes>
    </Router>
   
  );
}

export default App;
