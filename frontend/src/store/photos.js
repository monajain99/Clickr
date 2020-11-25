import { fetch } from "./csrf";

const RECEIVE_ALL_PHOTOS = "RECEIVE_ALL_PHOTOS";
const RECEIVE_PHOTOS_BY_USER = "RECEIVE_PHOTOS_BY_USER";
const RECEIVE_PHOTO = "RECEIVE_PHOTO";
const DELETE_PHOTO = "DELETE_PHOTO";
const POST_PHOTO = "POST_PHOTO"

const postBody = (photos) => {
  return {
    type: POST_PHOTO,
    photos
  }
}

export const postPhoto = ({
title,
description,
userId,
}
) => async (dispatch) =>{
  try {
    const res = await fetch("/api/photos", {method: "POST", body: JSON.stringify({title, description, userId}) });
    const photos = res.data;
    dispatch(postBody(photos));
  } catch (err) {
    console.error(err);
  }
};

const receiveAllPhotos = (photos) => {
  return{
    type: RECEIVE_ALL_PHOTOS,
    photos
  }
}

export const fetchPhotos = () => async (dispatch) => {
  try {
    const res = await fetch("/api/photos");
    const photos = res.data;
    dispatch(receiveAllPhotos(photos));
  } catch (err) {
    console.error(err);
  }
};

 const receivePhotosByUser = (photos) => {
  return {
    type: RECEIVE_PHOTOS_BY_USER,
    photos,
  };
};

 const receivePhoto = (photo) => ({
  type: RECEIVE_PHOTO,
  photo,
});

 const deletePhoto = (photoId) => ({
  type: DELETE_PHOTO,
  photoId,
});




// export const fetchPhoto = (id) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/photos/${id}`);
//     const photos = res.data;
//     dispatch(receivePhoto(photos.photo));
//   } catch (err) {
//     console.error(err);
//   }
// };


// export const fetchUserPhotos= (ownerId)=> async (dispatch) => {
//   try {
//     const res = await fetch(`/api/users/${id}/photos`);
//     const photos = res.data;
//       dispatch(receivePhotosByUser(photos.photos));
//     } catch (err) {
//     console.error(err);
//   }
// };

// export const uploadPhoto = (file, currentUserId, description) => {
//   let formData = new FormData();

//   formData.append("description", description);
//   formData.append("id", currentUserId);
//   formData.append("file", file.raw, file.raw.name);

//   let config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   return async (dispatch) => {
//     const res = await axios.post(`/api/photos/`, formData, config);
//     if (res) {
//       const photo = res.data.photo;
//       dispatch(receivePhoto(photo));
//     }

//     return res;
//   };
// };

// export const updatePhoto = (photo, id) => (dispatch) =>
//   PhotoAPI.updatePhoto(photo, id).then((payload) =>
//     dispatch(receivePhoto(payload))
//   );

// export const removePhoto = (id) => {
//   return async (dispatch) => {
//     const res = await fetch(`/api/photos/${id}`, {
//       method: "delete",
//       headers: {
//         "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
//       },
//     });
//     res.data = await res.json();
//     if (!res.ok) throw res;
//     if (res.ok) {
//       dispatch(deletePhoto(id));
//     }
//   };
// };


const photosReducer=(state = [], action)=> {
  switch (action.type) {
    case RECEIVE_ALL_PHOTOS:
      return { ...state, list: action.photos };
    case RECEIVE_PHOTO:
      return { ...state, single: action.photo };
    case RECEIVE_PHOTOS_BY_USER:
      return { ...state, users: action.photos };
    case POST_PHOTO:
      return { ...state, users: action.photos };
    case DELETE_PHOTO:
      return { ...state, users: action.photos };
    default:
      return state;
  }
}

export default photosReducer