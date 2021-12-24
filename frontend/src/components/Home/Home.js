import React, { useEffect, useState } from 'react';
import Header from "./Header";
import 'react-datepicker/dist/react-datepicker.css'
const Home=()=>{
  const [values,setValues]=useState({
    name:"",
    surname:"",
    pictureKey:"",
    studentId:"",
  });
  let list=[];
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
  useEffect(async()=>{
    await(fetch('https://projekt-fer.herokuapp.com/web/class', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
    })).then(function(response) {
      return response.json();
    }).then(data=>{
      try{
        console.log(data)
       for(var i=0;i<data.length;i++){
        list[i]={

        };
        setStudents({list:list});
       }}
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
  const deleteStudent=()=>{
    fetch("'https://projekt-fer.herokuapp.com/web/student/remove",{
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
  const editStudent=()=>{
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
    <div>   {/* {students.list.map((item,i) =><div><p key={i}>{item}</p> <button onClick={deleteStudent}>Obriši</button><button onClick={editStudent}>Uredi</button></div>)} */}</div>
      <div className="flex">
      <button className="submit" onClick={addingStudent}>Dodaj Učenika</button>
      <button className="submit" onClick={handleFormSubmit}>Predaj</button>
      </div>
  </div>
  </div>);
}
export default Home;