import React, { useState } from "react";
import * as sessionActions from "../../src/store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;



import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as photoActions from "../../store/photos";
import { fetch } from "../../../src/store/csrf";

const UploadFormPage = () => {
  //database
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");

  //cloudinary
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  //if (!user) return <Redirect to="/" />;

  //database
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(photoActions.postPhoto(title, description, user.id)).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  //preview cloud
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //cloudinary
  const handleCloudSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };
  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/photos", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-tyoe": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div align="center">
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
          <form onSubmit={handleCloudSubmitFile} classname="form">
            <input
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="form-input"
            />
            <button className="btn" type="submit">
              submit
            </button>
          </form>
          <div className="form_input-container">
            <button className="loginbtn" type="submit">
              Upload
            </button>
            <div></div>
          </div>
        </div>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

// const UploadFormPage = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.session.user);
//   const history = useHistory();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");

//   const [errors, setErrors] = useState([]);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(photoActions.postPhoto(title, description, user.id)).catch(
//       (res) => {
//         if (res.data && res.data.errors) setErrors(res.data.errors);
//       }
//     );
//   };

//   return (
//     <div align="center">
//       <div className="loginform_container">
//         <form onSubmit={handleSubmit} className="home_content-form">
//           <div className="form">
//             <ul>
//               {errors.map((error, idx) => (
//                 <li key={idx}>{error}</li>
//               ))}
//             </ul>
//             <h1 className="loginform_title">Clickr</h1>
//             <div className="loginform_subheading">Upload Image</div>
//             <div className="form_input-container">
//               {/* <label>Username or Email</label> */}
//               <br />
//               <input
//                 placeholder="Enter Title"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form_input-container">
//               {/* <label>Password</label> */}
//               <input
//                 placeholder="Enter Description"
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form_input-container">
//               {/* <label>Password</label> */}
//               <input
//                 placeholder="Enter Image Url"
//                 type="text"
//                 value={photoUrl}
//                 onChange={(e) => setPhotoUrl(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form_input-container">
//               <button className="loginbtn" type="submit">
//                 Upload
//               </button>
//               <div></div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export default UploadFormPage;

