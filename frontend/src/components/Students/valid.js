const valid=(values)=>{
  let errors ={};
  if(!values.ime){
    errors.ime="Potrebno je unijeti ime";
  }
  if(!values.prezime){
    errors.prezime="Potrebno je unijeti prezime";
  }
  if(!values.slicica){
    errors.slicica="Potrebno je unijeti sličicu"
  }
  return errors;
}
export default valid;