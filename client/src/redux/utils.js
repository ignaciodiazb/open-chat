export function privateMessagesState(state, message, action) {
  const user = action === 'send' ? message.recipient : message.sender;
  const chat = state.privateMessages.find(chat => chat.user === user);
  if (!chat) {
    return {
      ...state,
      privateMessages: [
        ...state.privateMessages,
        { user, messages: [message] },
      ],
    };
  } else {
    const updatedChat = { ...chat, messages: [...chat.messages, message] };
    return {
      ...state,
      privateMessages: [
        ...state.privateMessages.filter(chat => chat.user !== user),
        updatedChat,
      ],
    };
  }
}