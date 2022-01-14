import React,{ useState,useEffect } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import valid from './valid';
const AddStudent =()=>{
  const [randomImage, setRandomImage] = useState('');
  let location=useLocation()
  let navigate=useNavigate()
  console.log(location.state)
  const [values,setValues]=useState({
    ime:location.state.name,
    prezime:location.state.surname,
    slicica:location.state.pictureKey,
    idRazred:location.state.classId,
  });
  const[edit,setEdit]=useState(location.state.edit)
  const [errors,setErrors]=useState({});
  const [index,setIndex]=useState({num:""});
  const [error1,setError1]=useState({msg:""});
  Object.keys(errors).length=1
  const emoji = require("emoji-dictionary");
  const [dataIsCorrect,setDataIsCorrect]=useState(false);
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    setErrors(valid(values));
    console.log(errors.ime!==undefined)
    if(Object.keys(errors).length===0 && document.getElementById('name').value.length>0 && document.getElementById('surname').value.length>0 && values.slicica!==""){
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
              setError1({msg:data.err})
            }else{
              navigate("/home",{state:{classId:values.idRazred}})
            }
          })
      }
      
  };
  useEffect(()=>{
    console.log(values)
  },[values])
  const editStudent=(e)=>{
    e.preventDefault();
    fetch('https://projekt-fer.herokuapp.com/web/student/edit',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'same-origin', 
      body: JSON.stringify({name:values.ime,surname:values.prezime,pictureKey:values.slicica,studentId:location.state.studentId})
    }).then(function(response){
      return(response.json())
    }).then(data=>{
      console.log(data)
      navigate("/home",{state:{classId:values.idRazred}})
    })
  }
  const handleChange=(e)=>{
    let upper=(e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1);
    setValues({
      ...values,
      [e.target.name]:upper,},function(){
        console.log(values)
      });
  };
  const addImage=(i,index)=>{
    setIndex({...index,num:index})
    setValues({
      ...values,
      slicica:i});
      console.log(values)
  }
  return (<div className="container"><div className="app-wrapper">
  <div >
    {!edit &&<h2 className="title title-all">Dodavanje učenika</h2>}
    {edit &&<h2 className="title title-all">Uređivanje učenika</h2>}
  </div>
  <form className="form-wrapper">
    <div className="name">
      <label className="label">Ime</label>
      <input id="name"
      className="input capitalize" 
      name="ime" 
      type="text" 
      value={values.ime}
      onChange={handleChange}
      />
      {errors.ime && <p className="error">{errors.ime}</p>}
    </div>
    <div className="email">
      <label className="label">Prezime</label>
      <input id="surname"
      className="input capitalize" 
      type="text" 
      name="prezime" 
      value={values.prezime}
      onChange={handleChange}
      />
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
      <div className='image-container'>
        {/* {location.state.image_array.map((i,ind)=><img  key={ind} src={i} width="70" height="70" onClick={()=>addImage(i,ind)}/>)} */}
        {location.state.emoji_array.map((i,ind)=><span key={ind} className='emoji' onClick={()=>addImage(i,ind)}>{emoji.getUnicode(i)}</span>)}
      </div>
      {errors.slicica && <p className="error">{errors.slicica}</p>}
    </div>
    <div>
      {!edit &&<button type="submit" className="submit pointer" onClick={handleFormSubmit}>Dodaj
      </button>}
      {edit &&<button type="submit" className="submit pointer" onClick={editStudent}>Uredi
      </button>}
    </div>
  </form>
</div>
</div>);
};
export default AddStudent;
