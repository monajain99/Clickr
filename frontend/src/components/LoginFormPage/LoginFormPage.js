import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";


const LoginFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history= useHistory()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  
 
  if (user) return <Redirect to="/explore" />;
  // console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({
        credential: 'Demo-lition',
        password: 'password'
      })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  };

  return (
    <div align="center">
      <div className="loginform_container">
        <form onSubmit={handleSubmit} className="home_content-form">
          <div className="form">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <h1 className="loginform_title">Clickr</h1>
            <div className="loginform_subheading">Sign In</div>
            <div className="form_input-container">
              {/* <label>Username or Email</label> */}
              <br />
              <input
                placeholder="Enter Username or Email"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className="form_input-container">
              {/* <label>Password</label> */}
              <input
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form_input-container">
              <button className="loginbtn" type="submit">
                Log In
              </button>
              <div></div>
              <button className="loginbtn" onClick={demoLogin}>
                Log in as Demo User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormPage;



