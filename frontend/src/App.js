import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from './components/Login/Login';
import Form from './components/Register/Form';
import Home from './components/Home/Home';
import SignupForm from './components/Register/SignupForm';
import AddStudent from './components/Students/AddStudent';
import DeleteStudent from './components/Students/DeleteStudent';
import Class from './components/Class/Class'
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Form/>}></Route>
          <Route exact path='/signup' element={<SignupForm/>}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/add' element={<AddStudent/>}></Route>
          <Route exact path='/delete' element={<DeleteStudent/>}></Route>
          <Route exact path='/class' element={<Class/>}></Route>
       </Routes>
    </Router>
   
  );
}

export default App;
