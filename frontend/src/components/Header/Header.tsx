import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: FC = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/">
            <button className={`${styles.headerBtn} ${styles.logoBtn}`}>
              로고 이미지 추가예정
            </button>
          </Link>
          <Link to="/Marketplace">
            <button className={`${styles.headerBtn} ${styles.MarketplaceBtn}`}>
              Marketplace
            </button>
          </Link>
          <Link to="/Breeding">
            <button className={`${styles.headerBtn} ${styles.BreedingBtn}`}>
              Breeding
            </button>
          </Link>
          <Link to="/Game">
            <button className={`${styles.headerBtn} ${styles.gameBtn}`}>
              Game
            </button>
          </Link>
          <button className={`${styles.headerBtn} ${styles.loginBtn}`}>
            Login
          </button>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </>
  );
};

export default Header;
