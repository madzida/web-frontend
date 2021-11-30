import React from 'react';
import {Link} from 'react-router-dom';
const Header =()=>{
  return(
    <nav>
      <div className="header">
      <Link to={"/"} >
        <p className="link">Odjavi se</p>
      </Link>
      </div>
    </nav>
  );
};
export default Header;