import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate} from 'react-router-dom';
import Header from "../Home/Header";
import 'react-datepicker/dist/react-datepicker.css'
const Class=()=>{
  let navigate=useNavigate()
  const [classname,setClassName]=useState({name:""});
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/teacherClass', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
       withCredentials: true 
    }).then(function(response) {
      return (response.json());
    }).then(data=>{
      console.log(data)
    });

  },[]);
  const addClass=(e)=>{
    e.preventDefault();
    fetch('https://projekt-fer.herokuapp.com/web/makeClass',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body:{className:classname.name} 
    }).then(function(response){
      return (response.json())
    }).then(data=>{
      console.log(data)
    });
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate("/home",{state:{class:classname.name}})

  }
  const handleChange=(e)=>{
    setClassName({
      ...classname,
      [e.target.name]:e.target.value,});
  };
  return (
  <div>
    <div>
    <div><Header/></div>
    <h1 className="title2">Dobrodošli</h1>
    <hr/>
    <div className="classContainer">
    <div className="flex">TU IDE LISTA RAZREDA
    <button className="submit" onClick={()=>handleSubmit()} >Odaberi</button></div>
      <div className="flex">
      <form className="form-wrapper">
      <label className="label">Ime razreda</label>
      <input 
      className="input" 
      name="name" 
      type="text" 
      value={classname.name}
      onChange={handleChange}/>
      <button className="submit" onClick={()=>addClass()} >Dodaj</button>
      </form>
      </div>
      </div>
  </div>
  </div>);
}
export default Class;