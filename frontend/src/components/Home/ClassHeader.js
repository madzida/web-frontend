import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const logout = () => {
    fetch("https://projekt-fer.herokuapp.com/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then(function (response) {
      console.log("the response is" + JSON.stringify(response));
      return response.json();
    });
    window.location.href = "/";
    localStorage.clear();
  };
  return (
    <nav>
      <div className="header">
        <div className="titleClass title-all title-design">
          <img width="40" height="40" src={"../images/space-invaders.png"} />
          <p>Dobrodošli</p>
        </div>
        <button className="link pointer" onClick={logout}>
          Odjavi se
        </button>
      </div>
    </nav>
  );
};
export default Header;
