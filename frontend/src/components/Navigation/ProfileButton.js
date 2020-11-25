import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom'
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul className="links">
          <li className="logo">
            <NavLink to="/explore">clickr</NavLink>
          </li>
          <li className="explorelink">
            <NavLink to="/explore">Explore</NavLink>
          </li>
          <li className="explorelink">
            <NavLink to="/myphotos">My Photos</NavLink>
          </li>
          <li className="explorelink">
            <NavLink to="/uploadPhoto">Upload Photo</NavLink>
          </li>
        </ul>
      </div>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="loggedin">
          <div className="navbar-right">
            <ul className="greetinglogout">
              <li className="dropbtn">Hello, {user.username}!</li>
              <button onClick={logout} to="/" className="profile-logout-button">
                <i className="fas fa-user-circle" /> Logout
              </button>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default ProfileButton;
