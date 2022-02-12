import styles from '../styles/Settings.module.css';

const NicknameError = ({ error }) => {
  return (
    <div className={styles.error}>
      ❌ {error.message}
    </div>
  );
}

export default NicknameError