import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as photoActions from "../../store/photos";
import Photo from "../ExplorePage/Explore";


const PhotoFeedByUser = () => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => {
    return state.session.user;
  });

  const history = useHistory();

  useEffect(() => {
    dispatch(photoActions.fetchPhotos());
  }, [dispatch]);
  // const user = useSelector((state) => state.session.user);
  const photoList = useSelector((state) => state.photos.list);

  console.log('photolist',photoList);

  // const myItems = photoList;
  // console.log("myItems", myItems);
  // // const newArray =
  // const newArray = myItems.photos.filter((item) => item.userId === user.id);
  // console.log("newArray", newArray);

  // setPhotos({
  // photos: newArray
  // })

  if (!user) return <Redirect to="/" />;

  if (!photoList) {
    console.log("no photos");

    return null;
  }

  return (
    <grid-container>
      {Object.values(photoList.photos).map((photo, index) => {
        //   console.log(photo.title);
        let link = `${photo.photoUrl}`;
        return (
          <Link>
            <img src={link} key={photo.id} width="300" crop="scale"></img>
          </Link>
        );
      })}
    </grid-container>
  );
};

export default PhotoFeedByUser;
