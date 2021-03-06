
import React from "react";
import { NavLink,Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from '../../src/store/photos'



function SinglePhoto() {
  // const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    dispatch(photoActions.fetchPhoto(id));
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const photo = useSelector((state) => state.photos.single);
  const photos = useSelector((state) => state.photos.list);

  const comment = useSelector((state) => state.photos.comment);
  
  
  const handleClick = async (e, photo) => {
    e.preventDefault();
    console.log(photo)
    // setErrors([]);
    // const res = await fetch(`/api/photos/${photo}`, {
    //   method: "DELETE",
    // });
    // if (res && res.data) {
           
    //             photos.filter((photo) => {
    //                 return photo !== res.data;
    //             })
    //     }
    };

  if (!photo) return null;

  return (
    <>
      <h1 className="deleteButton">
        {photo.title} by {photo.User.username}
      </h1>
      <h3 className="deleteButton">{photo.description}</h3>
      <button
        className="deleteButton"
        onClick={(e) => handleClick(e, photo.id)}
      >
        delete{" "}
      </button>
      <button className="deleteButton">comment</button>
      <div div className="grid-container">
        <NavLink to={"/photo/:id"}>
          <img
            src={photo.photoUrl}
            width="800"
            crop="scale"
            alt="image"
            key={photo.id}
          ></img>
        </NavLink>
      </div>
    </>
  );
}

export default SinglePhoto