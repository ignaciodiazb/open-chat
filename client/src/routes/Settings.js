import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProvideNickname from '../components/ProvideNickname';
import NicknameError from '../components/NicknameError';
import styles from '../styles/Settings.module.css';

const Settings = ({ socket }) => {
  const { isConnected, nickname, connectedUsers } = useSelector(state => state.user);
  const [inputNickname, setInputNickname] = useState('');
  const [showProvideNickname, setShowProvideNickname] = useState(false);
  const [nicknameErrorComponent, setNicknameErrorComponent] = useState({
    show: false,
    data: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputNickname) {
      setShowProvideNickname(true);
      return;
    };
    socket.auth = { nickname: inputNickname };
    socket.connect();
  }

  useEffect(() => {
    document.title = 'Settings | Open Chat';
    socket.on('connect_error', (err) => {
      console.log(err);
      setNicknameErrorComponent({
        ...nicknameErrorComponent,
        show: true,
        data: err,
      });
    });
  }, []);


  return (
    <div>
      <h1 className={styles.heading}>Settings</h1>
      <div className={styles.main}>
        {!isConnected ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.labelAndInput}>
              <label htmlFor='nickname' className={styles.label}>Nickname</label>
              <input
                type='text'
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
                id='nickname'
                autoFocus
                className={styles.input}
              />
            </div>
            {showProvideNickname && <ProvideNickname />}
            {nicknameErrorComponent.show && <NicknameError error={nicknameErrorComponent.data} />}
            <input type='submit' value='Connect' className={styles.connectBtn} />
          </form>
        ) :
          <div className={styles.userInfo}>
            <h2>Info</h2>
            <p>Nickname: {nickname}</p>
            <p>Users connected: {connectedUsers.length}</p>
          </div>}
      </div>
    </div>
  );
}

export default Settings;