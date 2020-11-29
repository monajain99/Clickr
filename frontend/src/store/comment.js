import { fetch } from "./csrf";

const GET_COMMENTS = "comments/getComments";
const ADD_COMMENT = "comments/addComment";
const EDIT_COMMENT = "comments/editComment";
const DELETE_COMMENT = "comment/deleteComment";

export const getComments = () => {
  return {
    type: GET_COMMENTS,
  };
};

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};

const adjustComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  };
};

const removeComment = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: id,
  };
};

export const newComment = (comment, photoId, userId) => async (dispatch) => {
  const res = await fetch("/api/comments/", {
    method: "POST",
    body: JSON.stringify({
      comment,
      photoId,
      userId,
    }),
  });
  const newComment = res.data;
  dispatch(addComment(newComment));
};

export const deleteComment = (commentId, photoId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    body: JSON.stringify({
      photoId,
    }),
  });
  const comment = res.data;
  dispatch(removeComment(comment.id));
};

export const editComment = (commentId, newComment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify({
      newComment,
    }),
  });
  const comment = res.data;
  dispatch(adjustComment(comment));
};

const initialState = {comment: []};

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    case EDIT_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
