import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPublicMessage } from '../redux/actions/userActions';
import styles from '../styles/Chat.module.css';

const ChatBoard = ({ socket }) => {
  const { publicMessages, nickname } = useSelector(state => state.user);
  const lastMessage = useRef(null);
  const dispatch = useDispatch();

  const [userMsg, setUserMsg] = useState({
    sender: nickname,
    content: '',
  });

  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  const checkLastMessage = (index) => {
    if (index === (publicMessages.length - 1)) {
      return lastMessage;
    }
  }

  const handleSendPublicMessage = (e) => {
    e.preventDefault();
    if (!userMsg.content || !userMsg.sender) return;

    const newMessage = {
      ...userMsg,
      timeInMs: new Date().getTime(),
    }

    socket.emit('send-public-message', newMessage);
    dispatch(addPublicMessage(newMessage));
    setUserMsg({
      ...userMsg,
      content: '',
    });
  }

  useEffect(() => {
    scrollTo(lastMessage);
  }, [publicMessages]);

  return (
    <div className={styles.chatBoard}>
      <div className={styles.messagesContainer}>
        <ul className='messages'>
          {publicMessages.map((message, index) => (
            ((message.sender === nickname) ?
              <li key={message.timeInMs} ref={checkLastMessage(index)} style={{ textAlign: 'right' }}>Me: {message.content}</li> :
              <li key={message.timeInMs} ref={checkLastMessage(index)} style={{ textAlign: 'left' }}>{message.sender}: {message.content}</li>)
          ))}
        </ul>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSendPublicMessage} className={styles.form}>
          <input
            type='text'
            value={userMsg.content}
            onChange={(e) => setUserMsg({ ...userMsg, content: e.target.value })}
            className={styles.input}
            autoFocus
          />
          <input
            type='submit'
            value='send'
            className={styles.button}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatBoard;