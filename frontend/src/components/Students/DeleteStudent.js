import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
const DeleteStudent =()=>{
  const [values,setValues]=useState({idstudent:""})
  //ovdje nisam jos nista jer moram vidit kakv ce bit back da znm napravit
  useEffect(async()=>{
    await(fetch('/student/remove', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({values})
    })).then(function(response) {
      return response.json();
    });
  },[])

  return("shgS");


};
export default DeleteStudent;