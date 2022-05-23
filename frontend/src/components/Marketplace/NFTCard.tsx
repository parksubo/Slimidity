import React, { FC } from 'react';
import styles from './NFTCard.module.css';
import { NFTCardProps } from '../../common/DataTypes';

const NFTCard: FC<NFTCardProps> = ({ id, type, attack, price }) => {
  return (
    <div className={styles.container}>
      <span>id: {id}</span>
      <img src={require('../../images/IceSlime.png')} className={styles.img} />
      <div className={styles.metadata}>
        <span>가격: {price} ether</span>
        <span>타입: {type}</span>
        <span>공격력: {attack}</span>
      </div>
      <button className="btn btn-outline-secondary">Buy</button>
    </div>
  );
};

export default NFTCard;
