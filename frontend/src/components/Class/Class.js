import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import Header from "../Home/Header";
import 'react-datepicker/dist/react-datepicker.css'
const Class=()=>{
  let navigate=useNavigate()
  let location=useLocation()
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
       for(var i=0;i<data.length;i++){
         list[i]=data[i]
        
       }
       setClasses({list:list});
      }
       catch{
         console.log(data)
       }
    });

  },[]);
  const addClass=(e)=>{
    console.log(location.state)
    fetch('https://projekt-fer.herokuapp.com/web/makeClass',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body:JSON.stringify({className:classname.name,email:location.state})
    }).then(function(response){
      return (response.json())
    }).then(data=>{
      console.log(data)
      navigate("/home",{state:{classId:data.classId}})
    });
    e.preventDefault();
  }
  const handleSubmit=(e)=>{
    navigate("/home",{state:{classId:e}}
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
    {classes.list.map((item,i) =>{return<div className='flex-row'> <p className="list-container" key={i}>{item.className}</p><button className="link" onClick={()=>handleSubmit(item.classId)} >Odaberi</button></div>})}
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
      <button className="submit" onClick={addClass} >Dodaj</button>
      </form>
      </div>
      </div>
  </div>
  </div>);
}
export default Class;