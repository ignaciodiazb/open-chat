import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendPrivateMessage } from '../redux/actions/userActions';
import DisplayMessages from '../components/DisplayMessages';
import styles from '../styles/Chat.module.css';

const PrivateChat = ({ socket }) => {
  const { connectedUsers, nickname, privateMessages, id } = useSelector(state => state.user);
  const lastMessage = useRef(null);
  const dispatch = useDispatch();
  const [userSelected, setUserSelected] = useState(null);
  const [privateMessage, setPrivateMessage] = useState({
    sender: id,
    recipient: null,
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

  const handleSendPrivateMessage = (e) => {
    e.preventDefault();
    if (!privateMessage.content) return;

    const newPrivateMessage = {
      ...privateMessage,
      recipient: connectedUsers.find(user => user.id === userSelected.id).id,
      timeInMs: new Date().getTime(),
    };

    socket.emit('send-private-message', newPrivateMessage);
    dispatch(sendPrivateMessage(newPrivateMessage));
    setPrivateMessage({
      ...privateMessage,
      content: '',
    });
  }

  // function to check if a user is still online
  const isUserConnected = (userId) => {
    return connectedUsers.find(user => user.id === userId);
  }

  useEffect(() => {
    document.title = 'Private Chat | Open Chat';
    scrollTo(lastMessage);
  }, [privateMessages]);

  return (
    <div>
      <h1 className={styles.heading}>Private Chat</h1>
      <div className={styles.chatContainer}>
        <div className={styles.connectedUsersPrivate}>
          <h2>Users</h2>
          <ul>
            {connectedUsers.map((user) => (
              (
                user.nickname !== nickname &&
                <li
                  key={user.id}
                  onClick={() => setUserSelected(user)}
                  className={`${userSelected?.id === user.id ? styles.userSelected : null}`}
                >
                  {user.nickname}
                </li>
              )
            ))}
          </ul>
        </div>
        <div className={styles.chatBoard}>
          <div className={styles.messagesContainer}>
            {(userSelected && isUserConnected(userSelected.id)) ?
              <DisplayMessages user={userSelected} /> :
              <p>Select a user to chat</p>}
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleSendPrivateMessage} className={styles.form}>
              <input
                type='text'
                value={privateMessage.content}
                onChange={(e) => setPrivateMessage({ ...privateMessage, content: e.target.value })}
                className={styles.input}
              />
              <input type='submit' value='send' className={styles.button} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateChat;