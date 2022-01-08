import React, { useState, useEffect } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import moment from 'moment';
import Header from "../Home/Header";
const TestResult =()=>{
  let location=useLocation()
  let navigate=useNavigate()
  let list=[];
  const [results, setResults]=useState({list:[]})
  useEffect(()=>{
    fetch('https://projekt-fer.herokuapp.com/web/test/getResultsForTest?testId='+location.state, {
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
      },
       withCredentials: true 
    }).then(function(response) {
      return (response.json());
    }).then(data=>{
      console.log(data.length)
      for(var i=0;i<data.length;i++){
        console.log(data)
        list[i]=data[i];
      }
      setResults({list:list})
    });

  },[]);
  const studentResult=(studentId)=>{
    navigate("/studentResult",{state:{testId:location.state,studentId:studentId}})
  }
  return(<div>
    <div><Header/></div>
    <div className="result-list">
      <span>Ime i prezime</span>
      <span>Broj uništenih neprijatelja</span>
      <span>Trajanje igre</span>
    </div>
    <hr/>
    {results.list.map((item,i)=>{
      return(
      <div className="result-list" key={i}>
      <span onClick={()=>studentResult(item.studentId)}>{item.name} {item.surname}</span>
      <span>{item.results}</span>
      <span>{item.timeOf}</span>
    </div>
      )
    })}
  </div>)
}
export default TestResult;