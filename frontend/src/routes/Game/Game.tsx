import React, { FC } from 'react';
import styles from './Game.module.css';

const Game: FC = (props) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.gameContainer} ${styles.iframe16To9}`}>
        <iframe src="https://slimidity.netlify.app/" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Game;