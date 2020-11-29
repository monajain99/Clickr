import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
// import LoginFormPage from "../LoginFormPage/LoginFormPage"

import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;

  } else {
   
    sessionLinks = (
      <nav className="navbar">
        <div className="logo">
          {/* <h1>Inspire and Get Inspired</h1> */}
          <NavLink to="/">clickr</NavLink>
        </div>
        <div className="login-signup">
          <li className="loginlink">
            <NavLink to="/login">Log In</NavLink>
          </li>
          <li className="shift">
            <NavLink to="/signup" className="signupbutton">
              Sign Up
            </NavLink>
          </li>
        </div>
      </nav>
    );
  }
  

  return (
    <ul>
      <li>
        <div className="banner">
          <NavLink exact to="/"></NavLink>
          {sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;

