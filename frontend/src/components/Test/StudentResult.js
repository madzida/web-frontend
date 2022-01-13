import React, { useState, useEffect } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import moment from 'moment';
import Header from "../Home/Header";
const StudentResult =()=>{
  let location=useLocation()
  let navigate=useNavigate()
  let list=[];
  const [results, setResults]=useState({list:[]})
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/test/studentCalculationsForGivenTest?studentId='+location.state.studentId+'&testId='+location.state.testId, {
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
      },
       withCredentials: true 
    }).then(function(response) {
      return (response.json());
    }).then(data=>{
      for(var i=0;i<data.length;i++){
        console.log(data)
        list[i]=data[i];
      }
      setResults({list:list})
    });


  },[]);

  return(<div>
    <div><Header/></div>
    <div className="result-list container-list">
      <span>Proteklo vrijeme</span>
      <span>Računske operacije</span>
      <span>Čudovište uništeno?</span>
    </div>
    <hr/>
    {results.list.map((item,i)=>{
      return(
      <div className="result-list container-list" key={i}>
      <span>{item.timeTaken}</span>
      <span>{item.calculation}</span>
      {item.enemyKilledStatus=="false" && <span>Nije ubijeno</span>}
      {item.enemyKilledStatus=="true" && <span>Ubijeno</span>}
      
    </div>
      )
    })}
  </div>)
}
export default StudentResult;