import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles/App.module.css';

// Actions
import {
  connectSocket,
  getInitialUsers,
  addUser,
  removeUser,
  addPublicMessage,
  receivePrivateMessage
} from './redux/actions/userActions';

function App({ socket }) {
  const { isConnected, nickname, id } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Home | Open Chat';
    socket.on('connect', () => {
      dispatch(connectSocket({ id: socket.id, nickname: socket.auth.nickname }));
    });
    socket.on('get-users', (users) => {
      dispatch(getInitialUsers(users));
    });
    socket.on('new-user-connected', (user) => {
      dispatch(addUser(user));
    });
    socket.on('user-disconnected', (id) => {
      dispatch(removeUser(id));
    });
    socket.on('received-public-message', (newMessage) => {
      dispatch(addPublicMessage(newMessage));
    });
    socket.on('received-private-message', (newPrivateMessage) => {
      dispatch(receivePrivateMessage(newPrivateMessage));
    });
    return () => {
      socket.off('connect');
      socket.off('get-users');
      socket.off('new-user-connected');
      socket.off('user-disconnected');
    };
  }, [socket]);


  return (
    <div className={styles.app}>
      <div className={styles.appHeading}>
        <img src="https://emojiguide.org/images/emoji/g/138qkbdjg82rg.png" alt="Open Chat Logo" />
        <span>Open Chat</span>
      </div>
      <div className={styles.userInfo}>
        {/* {isConnected ? <div>You're connected</div> : <div>Go to settings and connect</div>}
        {id && <div>Socket id: {id}</div>} */}
        {!isConnected && <div>Go to settings and connect</div>}
        {nickname && <div>Nickname: {nickname}</div>}
      </div>
      <nav className={styles.navigation}>
        <Link to='/'>Home</Link>{' | '}
        <Link to='/public-chat'>Public Chat</Link>{' | '}
        <Link to='/private-chat'>Private Chat</Link>{' | '}
        <Link to='/settings'>Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;