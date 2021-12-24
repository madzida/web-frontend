import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import Header from "./Header";
import 'react-datepicker/dist/react-datepicker.css'
const Home=()=>{
  let location=useLocation();
  console.log(location)
  const [values,setValues]=useState({
    name:"",
    surname:"",
    pictureKey:"",
    studentId:"",
  });
  let list=[];
  const proba=[{
    studentId:1,
    name:"Mirta",
    surname:"vucinic",
    pictureKey:"bat.svg"
  },
  {
    studentId:2,
    name:"Jan",
    surname:"Roland",
    pictureKey:"bear.svg"
  },
  {
    studentId:3,
    name:"Davor",
    surname:"vucinic",
    pictureKey:"lion.svg"
  }
]
  const [students,setStudents]=useState({list:[]});
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    fetch('/home', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({})
    }).then(function(response) {
      return (response.json());
    });

  };
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/class?classId='+location.state, {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
    }).then(function(response) {
      return response.json();
    }).then(data=>{
      try{
        console.log(proba)
       for(var i=0;i<proba.length;i++){
         console.log(proba[i].surname)
         list[i]=proba[i]
        
       }
        setStudents({list:list});
      }
       catch{
         console.log(data)
       }
    });
  },[])
  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,});
  };
  const deleteStudent=(studentId)=>{
    var elem = document.getElementById(studentId);
    elem.parentNode.removeChild(elem);
    fetch("https://projekt-fer.herokuapp.com/web/student/remove",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({values})
    }).then(function(response) {
      return response.json();
    })
  }
  const editStudent=(studentId)=>{
    fetch("'https://projekt-fer.herokuapp.com/web/student/edit",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({values})
    }).then(function(response) {
      return response.json();
    })
  }   


  const addingStudent=()=>{
    window.location.href="/add";
  }

  return (
  <div>
    <div>
    <div><Header/></div>
    <h1 className="title2">Dobrodošli</h1>
    <hr/>
    <div className="classContainer">
    <div className="margin-top"> {students.list.map((item,i) =><div id={item.studentId} className='flex-row'><p className="list-container"key={i}>{item.name} {item.surname}</p> <button className='link' onClick={()=>deleteStudent(item.studentId)}>Obriši</button><button className='link' onClick={()=>editStudent(item.studentId,i)}>Uredi</button></div>)}</div>
      <div className="button-container">
      <button className="submit" onClick={addingStudent}>Dodaj Učenika</button>
      <button className="submit" onClick={handleFormSubmit}>Predaj</button>
      </div>
      </div>
  </div>
  </div>);
}
export default Home;