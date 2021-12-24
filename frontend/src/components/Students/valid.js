const valid=(values)=>{
  let errors ={};
  if(!values.ime){
    errors.ime="Potrebno je unijeti ime";
  }
  if(!values.prezime){
    errors.prezime="Potrebno je unijeti prezime";
  }
  return errors;
}
export default valid;