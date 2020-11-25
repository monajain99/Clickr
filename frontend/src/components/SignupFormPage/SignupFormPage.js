import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";




  function SignupFormPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (user) return <Redirect to="/explore" />;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setErrors([]);
        return dispatch(
          sessionActions.signup({ email, username, password })
        ).catch((res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
      }
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    };

    const demoLogin = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(
        sessionActions.login({
          credential: "Demo-lition",
          password: "password",
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
              <ul className="errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <h1 className="loginform_title">Clickr</h1>
              <div className="loginform_subheading"></div>
              <div className="form_input-container">
                <label></label>
                <input
                  placeholder="Enter Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form_input-container">
                <label></label>
                <input
                  placeholder="Enter Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form_input-container">
                <label></label>
                <input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form_input-container">
                <label></label>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button className="loginbtn" type="submit">
                  Create Account
                </button>
                <button className="loginbtn" to='/explore' onClick={demoLogin}>
                  Login as Demo User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }


export default SignupFormPage;
