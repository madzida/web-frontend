import React, { useState, useEffect } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import moment from 'moment';
import Header from "../Home/Header";
const Test =()=>{
  let location=useLocation()
  let navigate=useNavigate()
  const [state,setState]=useState({list:[]})
  console.log(location.state)
  const testResults=(testId)=>{
      navigate("/testResults",{state:testId})
  }
  useEffect(()=>{
    let sortedProducts;
    sortedProducts= [...location.state].sort((a,b)=>{
       return parseInt(b.testId)  - parseInt(a.testId);
    })
    setState({list:sortedProducts})
    console.log(state)
  },[location.state])
  return(<div>
    <div><Header/></div>
    <h5 className="test-list container-list">
      <span>Id testa</span>
      <span>Id razreda</span>
      <span>Datum stvaranja testa</span>
      <span>Status testa</span>
      <span>Pregled rezultata učenika</span>
    </h5>
    <hr />
    {state.list.map((test,i)=>{
    return(
    <div className="test-list container-list" key={i}>
      <span>Test #{test.testId}</span>
      <span>{test.classId}</span>
      <span>{moment(test.dateOf).format('DD.MM.YYYY')}</span>
      <span>{test.status}</span>
      <span><button className='link pointer' onClick={()=>testResults(test.testId)}>Pregledaj</button></span>
    </div>)
  })}
  </div>)
}
export default Test;