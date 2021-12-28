import React,{ useState,useEffect } from 'react';
import {Link,withRouter,useLocation,useNavigate,createSearchParams} from 'react-router-dom';
import valid from './valid';
const AddStudent =()=>{
  const [randomImage, setRandomImage] = useState('');
  // var image_array=['../images/bat.svg','../images/bear.svg','../images/bird.svg','../images/black_cat_black_and_white.svg','../images/butterfly.svg','../images/chick.svg','../images/crocodile.svg','../images/dog.svg','../images/dolphin.svg','../images/fish.svg','../images/flamingo.svg','../images/fox.svg','../images/ladybug.svg','../images/lion.svg','../images/monkey.svg','../images/mouse.svg','../images/octopus.svg','../images/panda.svg','../images/penguin.svg','../images/rhino.svg','../images/snail.svg','../images/snake.svg','../images/tiger.svg','../images/turtle.svg','../images/wolf.svg']
  let location=useLocation()
  let navigate=useNavigate()
  console.log(location.state.classId)
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
    setValues({
      ...values,
      [e.target.name]:e.target.value,},function(){
        console.log(values)
      });
  };
  const addImage=(i,index)=>{
    setIndex({...index,num:index})
    
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
      <input id="name"
      className="input" 
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
      className="input" 
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
      <div className='image-container'>{location.state.image_array.map((i,ind)=><img  key={ind} src={i} width="70" height="70" onClick={()=>addImage(i,ind)}/>)}
      </div>
      {errors.slicica && <p className="error">{errors.slicica}</p>}
      
    </div>
    <div>
      {!edit &&<button type="submit" className="submit" onClick={handleFormSubmit}>Dodaj
      </button>}
      {edit &&<button type="submit" className="submit" onClick={editStudent}>Uredi
      </button>}
    </div>
  </form>
</div>
</div>);
};
export default AddStudent;
