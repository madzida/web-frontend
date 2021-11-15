import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from './components/Login/Login';
import Form from './components/Register/Form';
import Home from './components/Home/Home';
import SignupForm from './components/Register/SignupForm';
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
