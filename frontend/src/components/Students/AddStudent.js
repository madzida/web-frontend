import React,{ useState,useEffect } from 'react';
import valid from './valid';
const AddStudent =()=>{
  const [randomImage, setRandomImage] = useState('');
  var image_array=['../images/bat.svg','../images/bear.svg','../images/bird.svg','../images/black_cat_black_and_white.svg','../images/butterfly.svg','../images/chick.svg','../images/crocodile.svg','../images/dog.svg','../images/dolphin.svg','../images/fish.svg','../images/flamingo.svg','../images/fox.svg','../images/ladybug.svg','../images/lion.svg','../images/monkey.svg','../images/mouse.svg','../images/octopus.svg','../images/panda.svg','../images/penguin.svg','../images/rhino.svg','../images/snail.svg','../images/snake.svg','../images/tiger.svg','../images/turtle.svg','../images/wolf.svg']
  const [values,setValues]=useState({
    ime:"",
    prezime:"",
    slicica:"",
    idRazred:1,
  });
  const [errors,setErrors]=useState({});
  const handleFormSubmit=(e)=>{
    fetch('https://projekt-fer.herokuapp.com/web/student/add', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then(function(response) {
        console.log("the response is"+response)
        return response.json();
      }).then(data=>{
        if(data.err){
          console.log(data.err)
        }else{
          window.location.href="/home"
        }
      })
      
    e.preventDefault();
    setErrors(valid(values));
  };
  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,});
      console.log(values)
  };
  const addImage=(i,index)=>{
    image_array.splice(index,1)
    console.log(index)
    var ret = i.replace('../images/','');
    setValues({
      ...values,
      slicica:ret});
      console.log(values)
  }
  return (<div className="container"><div className="app-wrapper">
  <div >
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
      {/* <label className="label">Sličica</label>
      <input 
      className="input" 
      type="text" 
      name="slicica" 
      value={values.slicica}
      onChange={handleChange}/>
      {errors.slicica && <p className="error">{errors.slicica}</p>} */}
      {image_array.map((i,ind)=><img src={i} width="70" height="70" onClick={()=>addImage(i,ind)}/>)}

      
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
