import { fetch } from "./csrf";
import * as commentActions from './comment';


const UPDATE_STATE = "UPDATE_STATE";
const GET_STATE = "GET_STATE";


//post photo action
const POST_PHOTO = "POST_PHOTO";
const postBody = (photo) => {
  return {
    type: POST_PHOTO,
    photo
  }
}

//post to cloudinary and database thunk
export const postPhoto = (
title,
description,
userId,
photoUrl
) => async (dispatch) =>{
  try {
    const res = await fetch("/api/photos", {
      method: "POST",
      body: JSON.stringify({ title, description, userId, photoUrl }),
    });
    const photo = res.data;
    dispatch(postBody(photo));
  } catch (err) {
    console.error(err);
  }
  };


// receive all photos action
const RECEIVE_ALL_PHOTOS = "RECEIVE_ALL_PHOTOS";
const receiveAllPhotos = (photos) => {
  return{
    type: RECEIVE_ALL_PHOTOS,
    photos
  }
}
// receive all photos thunk
export const fetchPhotos = () => async (dispatch) => {
  try {
    const res = await fetch("/api/photos");
    const photos = res.data;
    dispatch(receiveAllPhotos(photos));
  } catch (err) {
    console.error(err);
  }
};
 
const RECEIVE_PHOTO = "RECEIVE_PHOTO";
// receive single photos action
 const receivePhoto = (photo) => ({
   type: RECEIVE_PHOTO,
   photo,
 });

 // receive single photos thunk
export const fetchPhoto = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/photos/${id}`);
    const photos = res.data;
    dispatch(receivePhoto(photos.photo));
  } catch (err) {
    console.error(err);
  }
};

// receive single photos action by user
const GET_USER_PHOTOS = "photos/getByUser";
const userPhotos = (photos) => {
  return {
    type: GET_USER_PHOTOS,
    payload: photos,
  };
};

// receive photos by user thunk
export const fetchPhotosByUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/photos/${id}`);
  dispatch(userPhotos(response.data));
  return response;
};

// export const fetchPhotoByUser = (id) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/photos/${id}/`);
//     const photos = res.data;
//     dispatch(receivePhotosByUser(photos));
//     return photos
//   } catch (err) {
//     console.error(err);
//   }
// };

const updateState = (photos) => {
  return {
    type: UPDATE_STATE,
    payload: photos,
  };
};
export const updatingState = (userId) => async (dispatch) => {
  const res = await fetch(`/api/profile/photos/${userId}`);
  if (res) {
    dispatch(updateState(res.data.photos));
    return res;
  }
};


const getState = () => {
  return {
    type: GET_STATE,
  };
};
export const gettingState = () => (dispatch) => {
  dispatch(getState());
  return;
};


const deletePhoto = () => {
  return {
    type: DELETE_PHOTO,
  };
};

const DELETE_PHOTO = "DELETE_PHOTO";
export const deleteOnePhoto = ({ id, userId }) => async (dispatch) => {
  const res = await fetch(`/api/photo/${id}`, {
    method: "DELETE",
  });
  dispatch(deletePhoto());
  // updatingState(userId);
  return res;
};

export const reset = () => (dispatch) => {
  dispatch(reset());
  return;
};



// delete photo thunk
// export const deletePhoto = () => async (dispatch) => {
//   const photos = await fetch("/api/photos", {
//     method: "DELETE",
//   });
//   dispatch(receiveAllPhotos(photos));
//   return photos;
// }





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



let initialState = { photos: [] };


const photosReducer = (state = initialState, action) => {
  let newState
 // console.log(action)
  switch (action.type) {
    case RECEIVE_ALL_PHOTOS:
      return { ...state, list: action.photos };
    case RECEIVE_PHOTO:
      return { ...state, single: action.photo };
    case GET_USER_PHOTOS:
      return { ...state, list: action.photos };
    case POST_PHOTO:
      return { ...state, [action.photo.photo.id]: action.photo };
    case UPDATE_STATE:
      newState = { photos: [...action] };
      return newState;
    case GET_STATE:
      return state;
    case DELETE_PHOTO:
      // const index = state.indexOf(action.fruit)
      // if (index !== -1) return [...state.slice(0,index), ...state.slice(index + 1)]
      newState = { photos: [] };
      return newState;
    default:
      return state;
  }
}

export default photosReducer