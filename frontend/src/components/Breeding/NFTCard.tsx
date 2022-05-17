import React, { FC } from 'react';
import styles from './NFTCard.module.css';
const NFTCard: FC = (props) => {
  return (
    <div className={styles.container}>
      <span>id: NFT 아이디</span>
      <div className={styles.nftImage}>
        <img
          src={require('../../images/IceSlime.png')}
          className={styles.img}
        />
      </div>
      <div className={styles.metadata}>
        <span>가격</span>
        <span>타입</span>
        <span>공격력</span>
      </div>
    </div>
  );
};

export default NFTCard;
