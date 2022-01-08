import React, { useState, useEffect } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import moment from 'moment';
import Header from "../Home/Header";
const Test =()=>{
  let location=useLocation()
  let navigate=useNavigate()
  const testResults=(testId)=>{
      navigate("/testResults",{state:testId})
  }
  return(<div>
    <div><Header/></div>
    <h5 className="test-list">
      <span>Id testa</span>
      <span>Id razreda</span>
      <span>Datum stvaranja testa</span>
      <span>Status testa</span>
      <span>Pregled rezultata testa</span>
    </h5>
    <hr />
    {location.state.map((test,i)=>{
    return(
    <div className="test-list" key={i}>
      <span>Test #{test.testId}</span>
      <span>{test.classId}</span>
      <span>{moment(test.dateOf).format('DD.MM.YYYY HH:mm:ss')}</span>
      <span>{test.status}</span>
      <span><button className='link' onClick={()=>testResults(test.testId)}>Pregledaj</button></span>
    </div>)
  })}
  </div>)
}
export default Test;