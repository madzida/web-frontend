import React,{ useState } from 'react';
import valid from './valid';
const AddStudent =()=>{
  const [values,setValues]=useState({
    ime:"",
    prezime:"",
    slicica:"",
    idRazred:1,
  });
  const [errors,setErrors]=useState({});
  const handleFormSubmit=(e)=>{

    fetch('/student/add', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then(function(response) {
        console.log("the response is"+response)
        return response.json();
      });
      
    e.preventDefault();
    setErrors(valid(values));
    if(Object.keys(errors).length ===0){
      window.location.href="/home";
    }
/*     setErrors(validation(values));
    setDataIsCorrect(true); */
  };
/*   useEffect(()=>{
    if(Object.keys(errors).length ===0 && dataIsCorrect){
      submitForm(true);
    }
  },[errors]); */
  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,});
  };
  return (<div className="container"><div className="app-wrapper">
  <div>
    <h2 className="title">Dodavanje učenika</h2>
  </div>
  <form className="form-wrapper">
    <div className="name">
      <label className="label">Ime</label>
      <input 
      className="input" 
      name="ime" 
      type="text" 
      value={values.ime}
      onChange={handleChange}/>
      {errors.ime && <p className="error">{errors.ime}</p>}
    </div>
    <div className="email">
      <label className="label">Prezime</label>
      <input 
      className="input" 
      type="text" 
      name="prezime" 
      value={values.prezime}
      onChange={handleChange}/>
      {errors.prezime && <p className="error">{errors.prezime}</p>}
    </div>
    <div className="password">
      <label className="label">Sličica</label>
      <input 
      className="input" 
      type="text" 
      name="slicica" 
      value={values.slicica}
      onChange={handleChange}/>
      {errors.slicica && <p className="error">{errors.slicica}</p>}
    </div>
    <div>
      <button className="submit" onClick={handleFormSubmit}>Dodaj
      </button>
    </div>
  </form>
</div>
</div>);
};
export default AddStudent;
