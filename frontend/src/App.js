import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from './components/Login/Login';
import Form from './components/Register/Form';
import Home from './components/Home/Home';
import SignupForm from './components/Register/SignupForm';
import AddStudent from './components/Students/AddStudent';
import Class from './components/Class/Class';
import Test from './components/Test/Test';
import TestResult from './components/Test/TestResult';
import StudentResult from './components/Test/StudentResult';
import TopResults from './components/Test/TopResults';
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Form/>}></Route>
          <Route exact path='/signup' element={<SignupForm/>}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/add' element={<AddStudent/>}></Route>
          <Route exact path='/class' element={<Class/>}></Route>
          <Route exact path='/test' element={<Test/>}></Route>
          <Route exact path='/testResults' element={<TestResult/>}></Route>
          <Route exact path='/studentResult' element={<StudentResult/>}></Route>
          <Route exact path='/topResults' element={<TopResults/>}></Route>
       </Routes>
    </Router>
   
  );
}

export default App;
