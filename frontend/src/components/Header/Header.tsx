import React, { FC, MouseEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: FC = ({ children }) => {
  const [clicked, setClicked] = useState([false, false, false, false]);

  const changeButtonColor = (num: number) => {
    let newClicked = [false, false, false, false];
    newClicked[num] = true;
    setClicked(newClicked);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <button className={`${styles.headerBtn} ${styles.logoBtn}`}>
            로고 이미지 추가예정
          </button>
        </Link>
        <Link
          to="/Marketplace"
          className={clicked[0] ? styles.clickedLink : ''}
        >
          <button
            className={`${styles.headerBtn} ${styles.MarketplaceBtn}`}
            onClick={() => changeButtonColor(0)}
          >
            Marketplace
          </button>
        </Link>
        <Link to="/MyNFTPage" className={clicked[1] ? styles.clickedLink : ''}>
          <button
            className={`${styles.headerBtn} ${styles.MyNFTPageBtn}`}
            onClick={() => changeButtonColor(1)}
          >
            나의 NFT
          </button>
        </Link>
        <Link to="/Breeding" className={clicked[2] ? styles.clickedLink : ''}>
          <button
            className={`${styles.headerBtn} ${styles.MyNFTPageBtn}`}
            onClick={() => changeButtonColor(2)}
          >
            Breeding
          </button>
        </Link>
        <Link to="/Game" className={clicked[3] ? styles.clickedLink : ''}>
          <button
            className={`${styles.headerBtn} ${styles.MarketplaceBtn}`}
            onClick={() => changeButtonColor(3)}
          >
            Game
          </button>
        </Link>
        <button className={`${styles.headerBtn} ${styles.loginBtn}`}>
          Login
        </button>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Header;
