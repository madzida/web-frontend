import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import Header from "./Header";
import 'react-datepicker/dist/react-datepicker.css'
const Home=()=>{
  var image_array=['../images/bat.svg','../images/bear.svg','../images/bird.svg','../images/black_cat_black_and_white.svg','../images/butterfly.svg','../images/chick.svg','../images/crocodile.svg','../images/dog.svg','../images/dolphin.svg','../images/fish.svg','../images/flamingo.svg','../images/fox.svg','../images/ladybug.svg','../images/lion.svg','../images/monkey.svg','../images/mouse.svg','../images/octopus.svg','../images/panda.svg','../images/penguin.svg','../images/rhino.svg','../images/snail.svg','../images/snake.svg','../images/tiger.svg','../images/turtle.svg','../images/wolf.svg']
  let location=useLocation();
  console.log(location)
  let navigate=useNavigate()
  const [values,setValues]=useState({
    name:"",
    surname:"",
    pictureKey:"",
    studentId:"",
  });
  let list=[];
  const [students,setStudents]=useState({list:[]});
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/class?classId='+location.state.classId, {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
    }).then(function(response) {
      return response.json();
    }).then(data=>{
      try{
      console.log(data)
       for(var i=0;i<data.length;i++){
         list[i]=data[i]
        
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
    navigate("/add",{state:{image_array:image_array,classId:location.state}});
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
      </div>
      </div>
  </div>
  </div>);
}
export default Home;