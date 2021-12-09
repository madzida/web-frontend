import React, { useEffect, useState } from 'react';
import Header from "./Header";
import 'react-datepicker/dist/react-datepicker.css'
const Home=()=>{
  const [values,setValues]=useState([{student:""}]
  );
  const [password,setPassword]=useState({password:""}
  );
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    setPassword({...password,password:Math.random().toString(36).substring(2, 6)});
    fetch('/home', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({password})
    }).then(function(response) {
      return (response.json());
    });

  };
  const handleInputChange=(e,index)=>{
    const{name,value}=e.target;
    const list=[...values];
    list[index][name]=value;
    setValues(list);
  };
  const addStudent=()=>{
    setValues([...values,{student:""}])
  }
  const handleRemove=(index)=>{
    const list=[...values];
    list.splice(index,1);
    setValues(list);
  }
  const addingStudent=()=>{
    window.location.href="/add";
  }
  const deletingStudent=()=>{
    window.location.href="/delete";
  }
  return (
  <div>
    <div>
    <div><Header/></div>
    <h1 className="title2">Dobrodošli</h1>
    <hr/>
    <p>Kada završite s unosom učenika stisnite predaj i dobit ćete lozinku</p>
    <h2>Lozinka razreda je: {password.password}</h2>
{/*       <h4>Učenici</h4>
      {values.map((x,index)=>{
        return(
          <div key={index}>
            <input className="input-student" type="text" 
            name="student"
            value={x.student}
            onChange={e=>handleInputChange(e,index)}/>
             <button className="btn2"onClick={()=>handleRemove(index)}>Obriši</button>
            </div>
        )
        })
      } */}
      {/* <button className="btn"onClick={addStudent}>Dodaj učenika</button> */}
      <div className="flex">
      <button className="submit" onClick={addingStudent}>Dodaj Učenika</button>
      <button className="submit" onClick={deletingStudent}>Obriši učenika</button>
      <button className="submit" onClick={handleFormSubmit}>Predaj</button>
      </div>
  </div>
  </div>);
}
export default Home;