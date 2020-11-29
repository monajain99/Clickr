
import React from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from '../../src/store/photos'


function SinglePhoto() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    dispatch(photoActions.fetchPhoto(id));
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  console.log("thiis user", user)
  const photo = useSelector((state) => state.photos.single);
  const comment = useSelector((state) => state.photos.comment)

  
  if (!photo) return null
  console.log(photo.Comments)

  return (
    <>
      <h1>
        {photo.title} by {photo.User.username}
      </h1>
      <h1>{photo.description}</h1>
   

      <img
        src={photo.photoUrl}
        width="800"
        crop="scale"
        alt="image"
        key={photo.id}
      ></img>
      <button>delete</button>
      <button>comment</button>
    </>
  );
}

export default SinglePhoto