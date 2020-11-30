import { fetch } from "./csrf";

const LOGIN_USER = "LOGIN_USER";
const SET_SESSION = "SET_SESSION";
const END_SESSION = "END_SESSION";
const RECEIVE_ERRORS ="RECEIVE-ERRORS"

const setSession = (user) => {
  return {
    type: SET_SESSION,
    payload: user,
  };
};

const endSession = () => {
  return {
    type: END_SESSION,
  };
};

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors,
});

export const login = ({ credential, password }) => async (dispatch) => {
  try {
    const res = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });

    const { user } = res.data;

    dispatch(setSession(user));

    return {
      type: LOGIN_USER,
      payload: user,
    };
  } catch (err) {
    console.error(err);
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setSession(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  dispatch(setSession(response.data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(endSession());
  return response;
};

export const getUsers = () => {
  return async (dispatch) => {
    const res = await fetch("/api/users", {
      method: "get",
    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(setSession(res.data.users));
    }
    return res;
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    const res = await fetch(`/api/users/${id}`);
    res.data = await res.json();
    if (res.ok) {
      dispatch(setSession(res.data.user));
    }
    return res;
  };
};

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.payload };
    case END_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
