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
  const [redirect, setRedirect] = useState(false)

  //cloudinary
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  if (!user) return <Redirect to="/" />;

  //database
  const handleDataSubmit = (e) => {
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
    dispatch(photoActions.postPhoto(title, description, user.id, previewSource)).then(() => {
      alert("File Uploaded");
      return <Redirect to="/explore" />
    }).catch(() => {
      alert('Error')
      }
        
      //   (res) => {
      //     console.log("rrrrreeessss", res)
      //     if (res.data && res.data.errors);
      //     <Redirect to="/explore" />;
      //  } 
     );
  };

 if (redirect) {
   return <Redirect to="/explore" />;
 }

  
  return (
    <div align="center">
      <form onSubmit={handleCloudSubmitFile} className="form">
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

        <input
          placeholder="Enter Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Enter Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

 export default UploadFormPage;
