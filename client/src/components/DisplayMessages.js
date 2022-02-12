import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const DisplayMessages = ({ user }) => {
  const { privateMessages, id } = useSelector(state => state.user);
  const lastMessage = useRef(null);
  const chat = findChat(user.id);

  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  const checkLastMessage = (index) => {
    if (index === (privateMessages.find(chat => chat.user === user.id).messages.length - 1)) {
      return lastMessage;
    }
  }

  // function that returns a chat with a specific user
  function findChat(userId) {
    return privateMessages.find(chat => chat.user === userId);
  }

  useEffect(() => {
    scrollTo(lastMessage);
  }, [chat?.messages]);

  return (
    <React.Fragment>
      {!findChat(user.id) ?
        <p>Send a message to start a conversation with {user.nickname}</p> :
        <ul>
          {chat.messages.map((message, index) => (
            (message.sender === id) ?
              <li key={message.timeInMs} ref={checkLastMessage(index)} style={{ textAlign: 'right' }}>Me: {message.content}</li> :
              <li key={message.timeInMs} ref={checkLastMessage(index)} style={{ textAlign: 'left' }}>{user.nickname}: {message.content}</li>
          ))}
        </ul>}
    </React.Fragment>
  );
}

export default DisplayMessages;