
import React from "react";
import { Link, Redirect } from "react-router-dom";
import {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from '../../store/photos'


function PhotoFeed() {
  // const history = useHistory();
  // const [photos, setPhotos] = useState({}); 
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
    <>
    <div div className="grid-container">
      {photoList && Object.values(photoList.photos).map((photo, index) => {
        let link = `${photo.photoUrl}`;
        let id = `${photo.id}`;
        return (
          <>
            <Link to={`/photo/${id}`} key={photo.id}>
              <img src={link} key={photo.id} width="300" crop="scale" alt="" />
            </Link>
          </>
        );
      })}
      </div>
      </>
  );
}


export default PhotoFeed;
