import React, { useEffect, useState } from 'react';
import validation from './validation';
const SignupForm=({submitForm})=>{
  const [values,setValues]=useState({
    fullname:"",
    email:"",
    password:"",
  });
  const [errors,setErrors]=useState({});
  const [dataIsCorrect,setDataIsCorrect]=useState(false);
  const handleFormSubmit=(e)=>{

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(values)
      }).then(function(response) {
        console.log("the response is"+response)
        return response.json();
      });
      
    e.preventDefault();
    setErrors(validation(values));
    setDataIsCorrect(true);
  };
  useEffect(()=>{
    if(Object.keys(errors).length ===0 && dataIsCorrect){
      submitForm(true);
    }
  },[errors]);
  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,});
  };
  return (<div className="container"><div className="app-wrapper">
    <div>
      <h2 className="title">Registracija</h2>
    </div>
    <form className="form-wrapper">
      <div className="name">
        <label className="label">Ime i prezime</label>
        <input 
        className="input" 
        name="fullname" 
        type="text" 
        value={values.fullname}
        onChange={handleChange}/>
        {errors.fullname && <p className="error">{errors.fullname}</p>}
      </div>
      <div className="email">
        <label className="label">E-mail</label>
        <input 
        className="input" 
        type="email" 
        name="email" 
        value={values.email}
        onChange={handleChange}/>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="password">
        <label className="label">Lozinka</label>
        <input 
        className="input" 
        type="password" 
        name="password" 
        value={values.password}
        onChange={handleChange}/>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div>
        <button className="submit" onClick={handleFormSubmit}>Registriraj se
        </button>
      </div>
    </form>
  </div>
  </div>);
}
export default SignupForm;