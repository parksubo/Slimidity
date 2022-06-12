import React, { FC } from 'react';
import styles from './NFTCard.module.css';
import { NFTCardProps } from '../../common/DataTypes';
import { web3 } from '../../contracts';

const NFTCard: FC<NFTCardProps> = ({ id, type, health, attack, price }) => {
  return (
    <div className={styles.container}>
      <span>id: {id}</span>
      <div className={styles.nftImage}>
        <img
          src={require(`../../images/${type}Slime.png`)}
          className={styles.img}
        />
      </div>
      <div className={styles.metadata}>
        <span>가격: {web3.utils.fromWei(price)}</span>
        <span>타입: {type}</span>
        <span>체력: {health}</span>
        <span>공격력: {attack}</span>
      </div>
    </div>
  );
};

export default NFTCard;
