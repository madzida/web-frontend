import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
const DeleteStudent =()=>{
  const [values,setValues]=useState({
    ime:"",
    prezime:"",
    slicica:"",
    idRazred:1,
  });
  let list=[];
  const [students,setStudents]=useState({list:[]});
  //ovdje nisam jos nista jer moram vidit kakv ce bit back da znm napravit
  useEffect(async()=>{
    await(fetch('/students', {
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
       for(var i=0;i<data.students.length;i++){
        list[i]=data.students[i].name;
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
    fetch("/student/remove",{
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

  return(<div>
    <select id="dropdown" 
  className="input2" 
  type="text" 
  name="delete" 
  value={values}
  onChange={handleChange}>
   {students.list.map((item,i) => <option key={i}>{item}</option>)}
  </select>
  <button onClick={deleteStudent}>Obriši</button>
  </div> );


};
export default DeleteStudent;