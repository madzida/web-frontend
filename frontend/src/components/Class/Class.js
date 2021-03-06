import React, { useEffect, useState } from "react";
import {
  Link,
  withRouter,
  useLocation,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import ClassHeader from "../Home/ClassHeader";
import ReactHover, { Trigger, Hover } from "react-hover";
import "react-datepicker/dist/react-datepicker.css";
const Class = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let list = [];

  const [classname, setClassName] = useState({ name: "" });
  const token = localStorage.getItem("token");
  const [classes, setClasses] = useState({ list: [] });
  const [error, setError] = React.useState({ msg: "" });
  useEffect(() => {
    fetch("https://projekt-fer.herokuapp.com/web/teacherClass", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        try {
          for (var i = 0; i < data.length; i++) {
            list[i] = data[i];
          }
          setClasses({ list: list });
        } catch {
          console.log(data);
        }
      });
  }, []);
  const addClass = (e) => {
    console.log(location.state);
    fetch("https://projekt-fer.herokuapp.com/web/makeClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
      body: JSON.stringify({
        className: classname.name,
        email: location.state,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/class";
        // navigate("/home",{state:{classId:data.classId}})
      });
    e.preventDefault();
  };
  const getTests = (classId) => {
    fetch(
      "https://projekt-fer.herokuapp.com/web/test/getTestsForClass?classId=" +
        classId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "same-origin",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/test", { state: data });
      });
  };
  const handleSubmit = (e) => {
    navigate("/home", { state: { classId: e } });
  };
  const handleChange = (e) => {
    setClassName({
      ...classname,
      [e.target.name]: e.target.value,
    });
    console.log(classname);
  };
  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0,
  };
  return (
    <div>
      <div>
        <div>
          <ClassHeader />
        </div>
        <div className="classContainer">
          <div className="flex">
            <label className="label">Razredi</label>
            {classes.list.map((item, i) => {
              return (
                <div className="flex-row" key={i}>
                  <ReactHover options={optionsCursorTrueWithMargin}>
                    <Trigger type="trigger">
                      <p
                        className="list-container cursor"
                        onClick={() => getTests(item.classId)}
                      >
                        {item.className}
                      </p>
                    </Trigger>
                    <Hover type="hover">
                      <p className="hover-text">
                        Kliknite za pregled rezultata testova{" "}
                      </p>
                    </Hover>
                  </ReactHover>
                  <button
                    className="link pointer"
                    onClick={() => handleSubmit(item.classId)}
                  >
                    Odaberi
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex">
            <form>
              <label className="label">Dodaj razred</label>
              <input
                className="input"
                name="name"
                type="text"
                value={classname.name}
                onChange={handleChange}
              />
              {error.msg && <p className="error">{error.msg}</p>}
              <button className="submit pointer" onClick={addClass}>
                Dodaj
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Class;
