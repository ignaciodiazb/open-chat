import { ActionTypes } from '../constants/action-types';
import { privateMessagesState } from '../utils';

const initialState = {
  isConnected: false,
  id: null,
  nickname: null,
  connectedUsers: [],
  publicMessages: [],
  privateMessages: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ESTABLISHED_CONNECTION:
      return {
        ...state,
        isConnected: true,
        id: action.payload.id,
        nickname: action.payload.nickname,
      };
    case ActionTypes.GET_INITIAL_USERS:
      return {
        ...state,
        connectedUsers: [...state.connectedUsers, ...action.payload],
      };
    case ActionTypes.ADD_USER:
      return {
        ...state,
        connectedUsers: [...state.connectedUsers, action.payload],
      };
    case ActionTypes.REMOVE_USER:
      const newPrivateMessages = state.privateMessages.filter(chat => chat.user !== action.payload.id);
      return {
        ...state,
        connectedUsers: state.connectedUsers.filter(user => user.id !== action.payload.id),
        privateMessages: [...newPrivateMessages],
      };
    case ActionTypes.ADD_PUBLIC_MESSAGE:
      return {
        ...state,
        publicMessages: [...state.publicMessages, action.payload],
      };
    case ActionTypes.SEND_PRIVATE_MESSAGE:
      return privateMessagesState(state, action.payload, 'send');
    case ActionTypes.RECEIVE_PRIVATE_MESSAGE:
      return privateMessagesState(state, action.payload, 'receive');
    default:
      return state;
  }
}