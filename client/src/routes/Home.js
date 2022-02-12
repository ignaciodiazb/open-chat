import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <div className={styles.introduction}>
        <p>
          Welcome to Open Chat. This is a web application that allows you to chat in a public and a private room. To connect just go to settings and create a nickname.
        </p>
        <p>
          Please keep in mind that public and private messages are not being saved on a database, so if you close the browser tab, the connection will be terminated, and your messages will be deleted.
        </p>
        <p>
          If you want to learn more about this project, I've written a more detailed article on my <a href='https://icodesx.com/projects/open-chat' rel='noreferrer' target='_blank'>website</a>. In addition you can visit the <a href='https://github.com/icodesx/open-chat' rel='noreferrer' target='_blank'>Github repository</a> and contribute if you want. Contributions are welcome.
        </p>
        <p>Thanks.</p>
      </div>
    </div>
  );
}

export default Home;