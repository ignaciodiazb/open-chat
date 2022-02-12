import { ActionTypes } from '../constants/action-types';

export const connectSocket = (data) => {
  return {
    type: ActionTypes.ESTABLISHED_CONNECTION,
    payload: data,
  };
}

export const getInitialUsers = (users) => {
  return {
    type: ActionTypes.GET_INITIAL_USERS,
    payload: users,
  };
}

export const addUser = (user) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: user,
  };
}

export const removeUser = (id) => {
  return {
    type: ActionTypes.REMOVE_USER,
    payload: id,
  };
}

export const addPublicMessage = (message) => {
  return {
    type: ActionTypes.ADD_PUBLIC_MESSAGE,
    payload: message,
  };
}

export const sendPrivateMessage = (message) => {
  return {
    type: ActionTypes.SEND_PRIVATE_MESSAGE,
    payload: message,
  };
}

export const receivePrivateMessage = (message) => {
  return {
    type: ActionTypes.RECEIVE_PRIVATE_MESSAGE,
    payload: message,
  }
}