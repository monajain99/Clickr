
import React from "react";
import { Link, Redirect, } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from "../../store/photos";
import { getUser } from "../../store/session";

function PhotoFeedByUser() {
  // const [photos, setPhotos] = useState({});
  let user = useSelector((state) => state.session.user);
  


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(user.id))
    dispatch(photoActions.getPhotosByUserId());
  }, [dispatch]);

  const photoList = useSelector((state) => state.photos);


  if (!user) return <Redirect to="/" />;

  if (!photoList) {

    return null;
  }

  // const handleClick = (e) => {
  //   let photoId = photoList.photo.photo.id
  //   console.log(photo.id);
  //       history.push(`/photos/${photoId}`);
  //   };

  return (
    <>
    <div div className="grid-container">
      {
        Object.values(photoList).map((photo, index) => {
          let link = `${photo.photoUrl}`;
          let id = `${photo.id}`;
          return (
            <Link to={`/photo/${id}`}>
              <img
                src={link}
                key={photo.id}
                width="300"
                crop="scale"
                alt=""
                // onClick={handleClick}
              />
            </Link>
          );
        })}
      </div>
      </>
  );
}

export default PhotoFeedByUser;
