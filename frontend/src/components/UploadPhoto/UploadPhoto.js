import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as photoActions from "../../store/photos";
import { image } from "faker";


const UploadFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [errors, setErrors] = useState([]);

  console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(photoActions.postPhoto(title, description, user.id)).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
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
            <div className="loginform_subheading">Upload Image</div>
            <div className="form_input-container">
              {/* <label>Username or Email</label> */}
              <br />
              <input
                placeholder="Enter Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form_input-container">
              {/* <label>Password</label> */}
              <input
                placeholder="Enter Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form_input-container">
              {/* <label>Password</label> */}
              <input
                placeholder="Enter Image Url"
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
            <div className="form_input-container">
              <button className="loginbtn" type="submit">
                Upload
              </button>
              <div></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFormPage;
