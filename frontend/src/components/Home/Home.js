import React, { useEffect, useState } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import Header from "./Header";
import 'react-datepicker/dist/react-datepicker.css'
const Home=()=>{
  var image_array=['../images/bat.svg','../images/bear.svg','../images/bird.svg','../images/cat.svg','../images/butterfly.svg','../images/chick.svg','../images/crocodile.svg','../images/dog.svg','../images/dolphin.svg','../images/fish.svg','../images/flamingo.svg','../images/fox.svg','../images/ladybug.svg','../images/lion.svg','../images/monkey.svg','../images/mouse.svg','../images/octopus.svg','../images/panda.svg','../images/penguin.svg','../images/rhino.svg','../images/snail.svg','../images/snake.svg','../images/tiger.svg','../images/turtle.svg','../images/wolf.svg']
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
    const token = localStorage.getItem('token')
    fetch("https://projekt-fer.herokuapp.com/web/student/remove",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      withCredentials: true,
      body: JSON.stringify({studentId:studentId})
    }).then(function(response) {
      return response.json();
    }).then(data=>{
      console.log(data)
    })
    var elem = document.getElementById(studentId);
    elem.parentNode.removeChild(elem);
  }
  const editStudent=(studentId,name,surname,pictureKey)=>{
    navigate("/add",{state:{image_array:image_array,classId:location.state.classId,name:name,surname:surname,studentId:studentId,edit:true,pictureKey:pictureKey}})
  }   


  const addingStudent=()=>{
    navigate("/add",{state:{image_array:image_array,classId:location.state.classId,name:"",surname:"",studentId:"",edit:false,pictureKey:""}});
  }

  return (
  <div>
    <div>
    <div><Header/></div>
    <h1 className="title2">Dobrodošli</h1>
    <hr/>
    <div className="classContainer">
    <div className="margin-top"> {students.list.map((item,i) =><div id={item.studentId} className='flex-row'><p className="list-container"key={i}>{item.name} {item.surname  }<img src={"../images/"+item.pictureKey} width="25" height="20"/></p> <button><img width="25" height="20"src={"../images/delete.svg"} onClick={()=>deleteStudent(item.studentId)}/></button><button><img width="25" height="20"src={"../images/pencil.svg"} onClick={()=>editStudent(item.studentId,item.name,item.surname,item.pictureKey)}/></button></div>)}</div>
      <div className="button-container">
      <button className="submit" onClick={addingStudent}>Dodaj Učenika</button>
      </div>
      </div>
  </div>
  </div>);
}
export default Home;