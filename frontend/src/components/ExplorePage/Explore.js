import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from '../../store/photos'


function PhotoFeed() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoActions.fetchPhotos());
  }, [dispatch]);
  
  const photoList = useSelector((state) => state.photos.list);
  // console.log(photoList);
  const user = useSelector((state) => state.session.user);

  if (!user) return <Redirect to="/" />;

  if (!photoList) {
   console.log('no photos');

    return null;
  }

  return (
    < grid-container>
      {photoList && Object.values(photoList.photos).map((photo, index) => {
        console.log(photo.title);
        let link = `${photo.photoUrl}`;
        return (
          <Link>
            <img src={link} alt="image" key={photo.id}></img>
          </Link>
        );
      })}
    </ grid-container>
  );
}


export default PhotoFeed;
