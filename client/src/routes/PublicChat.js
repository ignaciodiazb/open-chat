import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatBoard from '../components/ChatBoard';
import styles from '../styles/Chat.module.css';

const PublicChat = ({ socket }) => {
  const { connectedUsers, id } = useSelector(state => state.user);

  useEffect(() => {
    document.title = 'Public Chat | Open Chat';
  }, []);


  return (
    <div>
      <h1 className={styles.heading}>Public Chat</h1>
      <div className={styles.chatContainer}>
        <div className={styles.connectedUsers}>
          <h2>Connected users</h2>
          <ul className={styles.connectedUsersList}>
            {connectedUsers.map((user) => (
              <li key={user.id} className={styles.user}>
                {user.nickname} {user.id === id && <span>&#40;me&#41;</span>}
              </li>
            ))}
          </ul>
        </div>
        <ChatBoard socket={socket} />
      </div>
    </div>
  )
}

export default PublicChat;