import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const Login=()=>{
  const [error, setError] = React.useState({msg:''});
  const [values,setValues]=useState({
    email:"",
    password:""
  });
  const handleFormSubmit=(e)=>{
    fetch('/login', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(values)
    }).then(function(response) {
      return response.json();
    }).then(data=>{
      if(data.err){
        setError({msg:data.err})
      }else{
        window.location.href="/home";
      }
    });
    e.preventDefault();
  };
  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,});
  };
  return (<div className="container"><div className="app-wrapper">
    <div>
      <h2 className="title">Prijava</h2>
    </div>
    <form>
      <div className="email">
        <label className="label">E-mail</label>
        <input 
        className="input" 
        type="email" 
        name="email" 
        value={values.email}
        onChange={handleChange}/>
      </div>
      <div className="password">
        <label className="label">Lozinka</label>
        <input 
        className="input" 
        type="password" 
        name="password" 
        value={values.password}
        onChange={handleChange}/>
      </div>
      <div>
        <button className="submit" onClick={handleFormSubmit}>Prijavi se</button>
      </div>
      <div className="register-text">Ako nemate korisnički račun odite na registraciju</div>
      <div>
      <Link to={"/signup"}>
        <button className="register">Registriraj se</button>
      </Link>
      </div>
    </form>
  </div>
  </div>);
}
export default Login;