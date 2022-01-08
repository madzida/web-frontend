import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import ClassHeader from "../Home/ClassHeader";
import 'react-datepicker/dist/react-datepicker.css'
const Class=()=>{
  let navigate=useNavigate()
  let location=useLocation()
  let list=[];

  const [classname,setClassName]=useState({name:""})
  const token = localStorage.getItem('token')
  const [classes,setClasses]=useState({list:[]});
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/teacherClass', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
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
  const getTests=(classId)=>{
    fetch('https://projekt-fer.herokuapp.com/web/test/getTestsForClass?classId='+classId,{
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
    }).then(function(response){
      return (response.json())
    }).then(data=>{
      console.log(data)
      navigate("/test",{state:data})
      
    });
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
    <div><ClassHeader/></div>
    <div className="classContainer">
    <div className="flex">
    <h3>Razredi</h3>
    {classes.list.map((item,i) =>{return<div className='flex-row'> <p className="list-container" key={i} onClick={()=>getTests(item.classId)}>{item.className}</p><button className="link" onClick={()=>handleSubmit(item.classId)} >Odaberi</button></div>})}
    </div>
      <div className="flex">
      <form>
      <label className="label">Ime razreda</label>
      <input 
      className="passwordinput" 
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