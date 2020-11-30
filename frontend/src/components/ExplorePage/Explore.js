// import React, { useEffect, useState } from "react";
// import { Image } from "cloudinary-react";
// import { Link, Redirect, useHistory } from "react-router-dom";
// import { Container } from "../../styled/Container";


// export default function PhotoFeed() {
//   const [imageIds, setImageIds] = useState();
//   const loadImages = async () => {
//     try {
//       const res = await fetch("/api/photos");
//       const data = await res.json();
//       setImageIds(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     loadImages();
//   }, []);
//   return (
//     <Container>
//       <h1 className="title"></h1>
//       <div className="gallery">
//         {imageIds &&
//           imageIds.map((imageId, index) => (
//             <Link>
//               <Image
//                 key={index}
//                 cloudName="sinkoverflow"
//                 publicId={imageId}
//                 width="300"
//                 crop="scale"
//               />
//             </Link>
//           ))}
//       </div>
//     </Container>
//   );
// }



import React from "react";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from '../../store/photos'


function PhotoFeed() {
  const history = useHistory();
  const [photos, setPhotos] = useState({}); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoActions.fetchPhotos());
  }, [dispatch]);
  
  const photoList = useSelector((state) => state.photos.list);
  const user = useSelector((state) => state.session.user);

  if (!user) return <Redirect to="/" />;

  if (!photoList) {
    return null;
  }

  return (
    <div div className="grid-container">
      {photoList && Object.values(photoList.photos).map((photo, index) => {
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
            />
          </Link>
        );
      })}
    </div>
  );
}


export default PhotoFeed;
