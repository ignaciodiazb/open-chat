import styles from '../styles/Settings.module.css';

const ProvideNickname = () => {
  return (
    <div className={styles.error}>
      ⚠️ Please provide a nickname.
    </div>
  );
}

export default ProvideNickname;