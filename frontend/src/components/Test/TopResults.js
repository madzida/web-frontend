import React,{useState,useEffect} from 'react';
import {Navigate, useLocation,useNavigate} from 'react-router-dom';
const TopResults =()=>{
  let listResults=[];
  let location=useLocation();
  let navigate=useNavigate();
  const colors=["color1","color2","color3","color4","color5","color6","color7","color8","color9","color10","color11","color12",
  "color13","color14","color15","color16","color17","color18","color19","color20","color21"]

  const [results,setResults]=useState({list:[]});
  const token = localStorage.getItem('token')
  useEffect(()=>{
    console.log(results)
  },[results])
  const proba=[
    {
      "studentId":1,
      "name":"Denis",
      "surname":"Pipo",
      "broj":"17"
    },
    {
      "studentId":2,
      "name":"Mateo",
      "surname":"Dumba",
      "broj":"16"
    },
    {
      "studentId":3,
      "name":"Ivan",
      "surname":"Liker",
      "broj":"14"
    },
    {
      "studentId":4,
      "name":"Paula",
      "surname":"Vulić",
      "broj":"11"
    },
    {
      "studentId":5,
      "name":"Denis",
      "surname":"Pipalović",
      "broj":"10"
    },
    {
      "studentId":6,
      "name":"Tomislav",
      "surname":"Jagušt",
      "broj":"8"
    },
    {
      "studentId":7,
      "name":"Jan",
      "surname":"Roland",
      "broj":"5"
    },
    {
      "studentId":8,
      "name":"Mirta",
      "surname":"Vučinić",
      "broj":"3"
    },
    {
      "studentId":9,
      "name":"Mislav",
      "surname":"Vučinić",
      "broj":"3"
    },
    {
      "studentId":10,
      "name":"Borna",
      "surname":"Vučinić",
      "broj":"1"
    }
  ]
  const topResults=async()=>{
        listResults=[]
        try{
          await (fetch('https://projekt-fer.herokuapp.com/web//test/liveResults?classId='+location.state.classId, {
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
          withCredentials: true,
        })).then(function(response) {
          return response.json();
        }).then(data=>{
          for(var i=0;i<proba.length;i++){
            listResults[i]=proba[i]
          
          }
          setResults({list:listResults});
        });
        }catch(err){
          console.log(err)
        }
    }
    useEffect(()=>{
      
      topResults()
      const interval=setInterval(()=>{
        topResults()
       },10000)
         
         
       return()=>clearInterval(interval)
  },[])
    const logout =()=>{
      fetch('https://projekt-fer.herokuapp.com/logout', {
        method: 'GET',
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'same-origin'
      }).then(function(response) {
        console.log("the response is"+JSON.stringify(response))
        return response.json();
      })
      window.location.href="/"
      localStorage.clear()
    }
    const goHome=()=>{
      navigate("/home",{state:{classId:location.state.classId}})
    }
  return(
    <div>
      <div>
      <nav>
      <div className="header">
        <div className="titleTopResults title-all pointer title-design"><img width="40" height="40" src={"../images/space-invaders.png"}/><p onClick={()=>goHome()}>Top rezultati</p></div>
        <button className="link" onClick={logout}>Odjavi se</button>
      </div>
    </nav>
      </div>
      <h5 className='topResult-container container-list'>
      <span>Poredak na ljestvici</span>
      <span>Ime</span>
      <span>Prezime</span>
      <span>Uništeno čudovišta</span>
      </h5>
      <hr />
      <div className="rows-toplist">{results.list.map((item,i)=>{return<div key={i} className={'topResult-container container-list top10 '+colors[(Math.floor(Math.random() * 21))]}>
        <span>{i+1}</span>
        <span>{item.name}</span>
        <span>{item.surname}</span>
        <span>{item.broj}</span>
        </div>})}</div>
      </div>
  );
};
export default TopResults;