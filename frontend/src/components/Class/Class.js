import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import Header from "../Home/Header";
import 'react-datepicker/dist/react-datepicker.css'
const Class=()=>{
  let navigate=useNavigate()
  let location=useLocation()
  console.log(location)
  let list=[];
  const proba=[{
    classId:1,
    className:"2.a",
    teacherEmail:"denis.pipalovic@fer.hr"
  },
  {
    classId:2,
    className:"4.a",
    teacherEmail:"denis.pipalovic@fer.hr"
  },
]
  const [classname,setClassName]=useState({name:""})
  const [classes,setClasses]=useState({list:[]});
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/teacherClass?email='+location.state, {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
       withCredentials: true 
    }).then(function(response) {
      return (response.json());
    }).then(data=>{
      console.log(data)
      try{
       for(var i=0;i<proba.length;i++){
         list[i]=proba[i]
        
       }
       setClasses({list:list});
      }
       catch{
         console.log(data)
       }
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
    navigate("/home",{state:e}
  );

  }
  const handleChange=(e)=>{
    setClassName({
      ...classname,
      [e.target.name]:e.target.value,});
      console.log(classname)
  };
  return (
  <div>
    <div>
    <div><Header/></div>
    <h1 className="title2">Dobrodošli</h1>
    <hr/>
    <div className="classContainer">
    <div className="flex">
    <label className="label">Razredi</label>
    {classes.list.map((item,i) =>{return<div className='flex-row'> <p className="text" key={i}>{item.className}</p><button className="link" onClick={()=>handleSubmit(item.classId)} >Odaberi</button></div>})}
    </div>
      <div className="flex">
      <form>
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